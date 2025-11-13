"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const items = [
  { title: "Functional Foods", subtitle: "Health care products", image: "/cleansers.jpg" },
  { title: "Nourishing Cream", subtitle: "Deep hydration", image: "/Moisturizer.jpg" },
  { title: "Daily Lotion Trio", subtitle: "Gentle formula", image: "/bodywash.jpg" },
  { title: "Botanical Gel", subtitle: "Soothing blend", image: "/botanical.webp" },
  { title: "Luxury Serum", subtitle: "Brightening", image: "/serums.webp" },
];

export default function ProductStandout() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const isReducedMotion = useReducedMotion();

  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({
    pointerDown: false,
    startX: 0,
    startScroll: 0,
    lastMoveTime: 0,
    lastMoveX: 0,
    velocity: 0,
  });

  // ---------- HELPERS ----------
  const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

  // ---------- AUTO PLAY (ping-pong) ----------
  useEffect(() => {
    const el = containerRef.current;
    if (!el || isReducedMotion) return;

    let dir = 1;
    const maxSpeed = 0.9;
    let speed = 0.45;

    const step = () => {
      if (!containerRef.current) return;
      const cur = containerRef.current;

      if (!isPaused && !isDragging && cur.scrollWidth > cur.clientWidth) {
        const maxScroll = cur.scrollWidth - cur.clientWidth;
        speed += (maxSpeed - speed) * 0.06;
        let next = cur.scrollLeft + speed * dir;
        if (next >= maxScroll) {
          next = maxScroll;
          dir = -1;
          speed = maxSpeed * 0.6;
        } else if (next <= 0) {
          next = 0;
          dir = 1;
          speed = maxSpeed * 0.6;
        }
        cur.scrollLeft = next;
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [isPaused, isDragging, isReducedMotion]);

  // ---------- WHEEL -> HORIZONTAL ----------
  const onWheel = (e: React.WheelEvent) => {
    const el = containerRef.current;
    if (!el) return;
    if (el.scrollWidth <= el.clientWidth) return;

    e.preventDefault();
    const base = 1;
    const shift = 1.8;
    const mult = e.shiftKey ? base * shift : base;
    el.scrollLeft = clamp(el.scrollLeft + e.deltaY * mult, 0, el.scrollWidth - el.clientWidth);
  };

  // ---------- POINTER (drag) ----------
  const onPointerDown = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    dragState.current.pointerDown = true;
    dragState.current.startX = clientX;
    dragState.current.startScroll = el.scrollLeft;
    dragState.current.lastMoveTime = performance.now();
    dragState.current.lastMoveX = clientX;
    dragState.current.velocity = 0;
    setIsPaused(true);
    setIsDragging(true);
    (document.body as any).style.userSelect = "none";
  };

  const onPointerMove = (clientX: number) => {
    const el = containerRef.current;
    if (!el || !dragState.current.pointerDown) return;
    const dx = clientX - dragState.current.startX;
    el.scrollLeft = clamp(dragState.current.startScroll - dx, 0, el.scrollWidth - el.clientWidth);

    // velocity
    const now = performance.now();
    const dt = Math.max(8, now - dragState.current.lastMoveTime);
    const vx = (clientX - dragState.current.lastMoveX) / dt;
    dragState.current.velocity = vx;
    dragState.current.lastMoveTime = now;
    dragState.current.lastMoveX = clientX;
  };

  const onPointerUp = () => {
    const el = containerRef.current;
    if (!el) return;
    if (!dragState.current.pointerDown) return;
    dragState.current.pointerDown = false;

    const velocityPxPerFrame = dragState.current.velocity * 16;
    const inertia = clamp(velocityPxPerFrame * 14, -1200, 1200);
    const start = el.scrollLeft;
    const target = clamp(start - inertia, 0, el.scrollWidth - el.clientWidth);
    const duration = 420;
    const t0 = performance.now();

    const animate = () => {
      const t = clamp((performance.now() - t0) / duration, 0, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.scrollLeft = Math.round(start + (target - start) * eased);
      if (t < 1) requestAnimationFrame(animate);
      else snapToNearestCard();
    };
    requestAnimationFrame(animate);

    setIsDragging(false);
    setIsPaused(false);
    (document.body as any).style.userSelect = "";
  };

  // mouse handlers
  const onMouseDown = (e: React.MouseEvent) => onPointerDown(e.clientX);
  const onMouseMove = (e: React.MouseEvent) => onPointerMove(e.clientX);
  const onMouseUp = () => onPointerUp();

  // touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    if (!e.touches || e.touches.length === 0) return;
    onPointerDown(e.touches[0].clientX);
    setIsPaused(true);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!e.touches || e.touches.length === 0) return;
    onPointerMove(e.touches[0].clientX);
  };
  const onTouchEnd = () => onPointerUp();

  // ---------- SNAP / SCROLL helpers ----------
  const snapToNearestCard = () => {
    const el = containerRef.current;
    if (!el) return;
    const children = Array.from(el.children) as HTMLElement[];
    if (!children.length) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    let bestIdx = 0;
    let bestDist = Infinity;
    children.forEach((child, i) => {
      const cCenter = child.offsetLeft + child.clientWidth / 2;
      const dist = Math.abs(cCenter - center);
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = i;
      }
    });
    scrollToIndex(bestIdx);
  };

  const scrollToIndex = (index: number) => {
    const el = containerRef.current;
    if (!el) return;
    const child = el.children[index] as HTMLElement | undefined;
    if (!child) return;
    const left = child.offsetLeft;
    const target = clamp(left - (el.clientWidth - child.clientWidth) / 2, 0, el.scrollWidth - el.clientWidth);

    if ("scrollBehavior" in document.documentElement.style) {
      el.scrollTo({ left: target, behavior: "smooth" });
    } else {
      // fallback animation
      const start = el.scrollLeft;
      const duration = 420;
      const t0 = performance.now();
      const animate = () => {
        const t = clamp((performance.now() - t0) / duration, 0, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.scrollLeft = Math.round(start + (target - start) * eased);
        if (t < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  };

  // ---------- KEYBOARD nav (left/right) ----------
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (document.activeElement && (document.activeElement as HTMLElement).closest("[role='list']")) {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          const children = Array.from(el.children) as HTMLElement[];
          const activeIdx = children.findIndex((c) => c.contains(document.activeElement));
          const nextIdx = clamp(activeIdx < 0 ? 0 : activeIdx + 1, 0, children.length - 1);
          (children[nextIdx] as HTMLElement).focus();
          scrollToIndex(nextIdx);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          const children = Array.from(el.children) as HTMLElement[];
          const activeIdx = children.findIndex((c) => c.contains(document.activeElement));
          const prevIdx = clamp(activeIdx < 0 ? 0 : activeIdx - 1, 0, children.length - 1);
          (children[prevIdx] as HTMLElement).focus();
          scrollToIndex(prevIdx);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // pause when focus in/out
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onFocusIn = () => setIsPaused(true);
    const onFocusOut = (ev: FocusEvent) => {
      if (!el.contains(ev.relatedTarget as Node)) setIsPaused(false);
    };
    el.addEventListener("focusin", onFocusIn);
    el.addEventListener("focusout", onFocusOut);
    return () => {
      el.removeEventListener("focusin", onFocusIn);
      el.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  // snap after resize
  useEffect(() => {
    const onResize = () => {
      window.setTimeout(() => snapToNearestCard(), 150);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ---------- POINTER PARALLAX ----------
  const pointerParallax = useRef(0);
  useEffect(() => {
    const el = containerRef.current;
    if (!el || isReducedMotion) return;
    const onMove = (ev: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ev.clientX - (rect.left + rect.width / 2);
      pointerParallax.current = clamp(x / (rect.width / 2), -1, 1);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [isReducedMotion]);

  // ---------- FRAMER VARIANTS ----------
  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 12, scale: 0.995 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 28 } },
    hover: { scale: 1.035, y: -6, transition: { type: "spring", stiffness: 420, damping: 22 } },
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-[#FFF1F0] to-[#FFF7F8] overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-start justify-between mb-8">
          <h2 className="text-3xl sm:text-3xl lg:text-4xl font-serif leading-tight text-gray-900">
            WHAT MAKES OUR
            <br />
            PRODUCT STAND OUT
          </h2>
          <p className="hidden lg:block text-sm text-gray-600 max-w-xs">
            Cruelty-Free and Vegan — a caring product made to work with delicate skin and natural results.
          </p>
        </div>
      </div>

      {/* carousel */}
      <div className="w-full overflow-hidden">
        <div className="relative px-4">
          <motion.div
            ref={containerRef}
            role="list"
            initial="hidden"
            whileInView={!isReducedMotion ? "show" : "show"} // reduced motion still shows but uses simple transforms
            viewport={{ once: true, amount: 0.16 }}
            variants={containerVariants}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => {
              if (!isDragging) setIsPaused(false);
            }}
            onWheel={onWheel}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={() => {
              if (isDragging) onMouseUp();
            }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            className="flex gap-6 overflow-x-auto py-6 snap-x snap-mandatory no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {items.map((it, idx) => (
              <motion.article
                key={idx}
                role="listitem"
                tabIndex={0}
                variants={itemVariants}
                whileHover={!isReducedMotion ? "hover" : undefined}
                className="snap-center flex-shrink-0 w-[86vw] sm:w-[44vw] md:w-[360px] lg:w-[380px] rounded-3xl overflow-hidden relative group focus:outline-none"
                style={{ minWidth: 280 }}
                aria-label={it.title}
                onFocus={() => {
                  setIsPaused(true);
                  scrollToIndex(idx);
                }}
              >
                {/* card container */}
                <div
                  className="relative h-[280px] sm:h-[320px] md:h-[360px] lg:h-[380px] rounded-3xl overflow-hidden transform transition-transform duration-300 group-hover:scale-105 origin-center bg-white"
                  // subtle parallax transform on hover (non-essential - respects reduced motion)
                  style={
                    !isReducedMotion
                      ? {
                          transform: `perspective(900px) translateZ(0)`,
                          willChange: "transform",
                        }
                      : undefined
                  }
                >
                  {/* image */}
                  <div className="absolute inset-0">
                    <Image
                      src={it.image}
                      alt={it.title}
                      fill
                      className="object-cover"
                      sizes="(max-width:640px) 90vw, (max-width:1024px) 45vw, 380px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/12 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* top-left subtle accent (keeps your name/subtitle markup exactly intact) */}
                  <div className="absolute left-6 bottom-6 z-20">
                    <div className="flex items-start gap-3">
                      <div className="w-3 h-3 bg-pink-500 rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="text-left">
                        {/* UNCHANGED: subtitle & title styling preserved */}
                        <p className="text-sm text-white opacity-0 group-hover:opacity-90 transition-opacity duration-300">
                          {it.subtitle}
                        </p>
                        <h3 className="text-lg font-semibold text-white opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                          {it.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* decorative dot */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none">
            <div className="w-3 h-3 rounded-full bg-pink-500 shadow" />
          </div>
        </div>
      </div>
    </section>
  );
}
