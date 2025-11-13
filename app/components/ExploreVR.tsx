"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Category = { name: string; subtitle?: string; image: string };

const categories: Category[] = [
  { name: "Chris Yellow", subtitle: "Designer", image: "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=1200" },
  { name: "Melanie Afke", subtitle: "Beauty Teacher", image: "https://images.pexels.com/photos/3952173/pexels-photo-3952173.jpeg?auto=compress&cs=tinysrgb&w=1200" },
  { name: "Jude Goggins", subtitle: "Sophomore", image: "https://images.pexels.com/photos/4812636/pexels-photo-4812636.jpeg?auto=compress&cs=tinysrgb&w=1200" },
  { name: "Amy Blackhouse", subtitle: "Chemistry Teacher", image: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=1200" },
  { name: "Team Steve", subtitle: "Junior", image: "https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=1200" },
];

export default function ExploreVRCentered() {
  // ----- CONFIG -----
  const MOBILE_BREAK = 768;
  const TRANS_DUR = 420; // milliseconds for transform/transition (change to make snappier/slower)
  const AUTOPLAY_INTERVAL = 2200; // ms between autoplay advances on desktop
  const AUTOPLAY_ENABLED_ON_DESKTOP = true;

  // ----- STATE & REFS -----
  const [isMobile, setIsMobile] = useState<boolean>(typeof window !== "undefined" ? window.innerWidth < MOBILE_BREAK : false);
  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth < MOBILE_BREAK);
    }
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const reduceMotion = useReducedMotion();

  const [active, setActive] = useState(Math.floor(categories.length / 2));
  const [autoplayRunning, setAutoplayRunning] = useState(AUTOPLAY_ENABLED_ON_DESKTOP);
  const autoplayDirRef = useRef(1);
  const autoplayTimerRef = useRef<number | null>(null);

  // For double-tap handling on mobile
  const lastTapRef = useRef<{ idx: number | null; time: number }>({ idx: null, time: 0 });

  // keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") setActive((s) => Math.min(categories.length - 1, s + 1));
      if (e.key === "ArrowLeft") setActive((s) => Math.max(0, s - 1));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // autoplay effect (desktop only)
  useEffect(() => {
    if (isMobile || reduceMotion || !autoplayRunning) return;
    // guard: only enable if more than 1 card
    if (categories.length <= 1) return;

    function step() {
      setActive((prev) => {
        let dir = autoplayDirRef.current;
        let next = prev + dir;
        if (next >= categories.length) {
          autoplayDirRef.current = -1;
          next = categories.length - 2 >= 0 ? categories.length - 2 : categories.length - 1;
        } else if (next < 0) {
          autoplayDirRef.current = 1;
          next = 1 <= categories.length - 1 ? 1 : 0;
        }
        return clamp(next, 0, categories.length - 1);
      });
    }

    autoplayTimerRef.current = window.setInterval(step, AUTOPLAY_INTERVAL);
    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    };
  }, [isMobile, reduceMotion, autoplayRunning]);

  // helper clamp
  function clamp(v: number, a: number, b: number) {
    return Math.max(a, Math.min(b, v));
  }

  // DRAG support (desktop)
  const stageRef = useRef<HTMLDivElement | null>(null);
  function handleDragEnd(_: any, info: { offset: { x: number } }) {
    const offsetX = info.offset.x;
    const CARD_W = isMobile ? 280 : 340;
    const STEP = CARD_W * 0.6;
    const deltaIndex = Math.round(-offsetX / STEP);
    if (deltaIndex !== 0) {
      setActive((s) => clamp(s + deltaIndex, 0, categories.length - 1));
    }
  }

  // mobile double-tap to center
  function handleMobileTap(idx: number) {
    const now = performance.now();
    const last = lastTapRef.current;
    if (last.idx === idx && now - last.time < 350) {
      // double-tap detected
      setActive(idx);
      lastTapRef.current = { idx: null, time: 0 };
    } else {
      lastTapRef.current = { idx, time: now };
    }
  }

  // transforms
  const transforms = useMemo(() => {
    const CARD_W = isMobile ? 280 : 340;
    const CARD_H = isMobile ? 320 : 360;
    const GAP = isMobile ? 20 : 48;
    const TILT = isMobile ? 8 : 20;
    const MAX_DEPTH = isMobile ? 160 : 360;
    const CENTER_IDX = active;

    return categories.map((_, i) => {
      const diff = i - CENTER_IDX;
      const abs = Math.abs(diff);

      const stepX = CARD_W * 0.52 + GAP * 0.18;
      const translateX = diff * stepX;

      const rotateY = diff * -TILT * (isMobile ? 0.35 : 1);

      const depthFactor = Math.max(0, 1 - Math.pow(abs, 1.05) * 0.45);
      const translateZ = Math.round(depthFactor * MAX_DEPTH);

      const arc = -Math.pow(diff, 2) * (isMobile ? 3.5 : 6) + (diff < 0 ? (isMobile ? -3.5 : -6) : isMobile ? 3.5 : 6);
      const translateY = -(arc - depthFactor * (isMobile ? 8 : 12));

      const scale = abs === 0 ? (isMobile ? 1.06 : 1.12) : 1 - Math.min(0.14, abs * 0.05);
      const opacity = abs === 0 ? 1 : abs === 1 ? 0.94 : 0.3;
      const desat = abs === 0 ? 0 : abs === 1 ? 0.04 : 0.28;
      const borderRadius = abs === 0 ? 18 : 12;
      const zIndex = 3000 - abs * 50 + translateZ;
      const blur = abs > 1 ? (isMobile ? 1.5 : 2.2) : 0;

      return { translateX, rotateY, translateZ, translateY, scale, opacity, borderRadius, zIndex, desat, blur, CARD_W, CARD_H };
    });
  }, [active, isMobile]);

  // framer variants
  const containerVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.04 } },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 8, scale: 0.995 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 28 } },
    hover: { scale: 1.03, transition: { duration: 0.22 } },
  };

  // toggle autoplay (button)
  function toggleAutoplay() {
    setAutoplayRunning((s) => !s);
    autoplayDirRef.current = 1; // reset direction when user toggles
  }

  return (
    <section className="bg-white relative overflow-visible" aria-label="Explore VR">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-2">
        <div className="grid lg:grid-cols-2 gap-4 items-start">
          <div>
            <h2 className="text-3xl lg:text-4xl font-serif leading-tight">
              EXPLORE THE
              <br />
              FUTURE OF
              <br />
              VIRTUAL REALITY
            </h2>
          </div>
          <div>
            <p className="text-gray-600 max-w-lg">Center is highlighted — neighbors tilt and fade like a cover-flow.</p>
          </div>
        </div>
      </div>

      {/* Stage */}
      <div className="w-full overflow-hidden">
        <div
          ref={stageRef}
          className="mx-auto relative"
          style={{
            maxWidth: 1400,
            height: (isMobile ? 320 : 360) + 140,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 16px",
            perspective: 1600,
            perspectiveOrigin: "50% 56%",
          }}
        >
          <motion.div
            className="relative w-full"
            initial={reduceMotion ? undefined : "hidden"}
            animate={reduceMotion ? undefined : "show"}
            variants={containerVariants}
            drag={!isMobile ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={handleDragEnd}
            whileTap={!reduceMotion ? { cursor: "grabbing" } : undefined}
            style={{ height: "100%" }}
          >
            {/* Mobile scroller */}
            {isMobile ? (
              <div className="flex gap-4 overflow-x-auto no-scrollbar px-2 py-6 touch-pan-x" role="list">
                {categories.map((c, i) => (
                  <motion.div
                    key={i}
                    role="listitem"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    whileHover={!reduceMotion ? { scale: 1.03 } : undefined}
                    className="flex-shrink-0"
                    style={{
                      width: Math.min(300, 0.94 * (typeof window !== "undefined" ? window.innerWidth : 320)),
                      height: transforms[i]?.CARD_H || 320,
                      borderRadius: 14,
                      overflow: "hidden",
                      boxShadow: "0 12px 30px rgba(16,24,40,0.08)",
                      background: "#fff",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      // single tap centers? we'll use double-tap to center to avoid accidental centers while scrolling
                    }}
                    onTouchEnd={() => handleMobileTap(i)}
                  >
                    <img src={c.image} alt={c.name} loading="lazy" className="w-full h-full object-cover" />
                  </motion.div>
                ))}
              </div>
            ) : (
              // Desktop cover-flow
              <div className="absolute inset-0 flex items-center justify-center">
                {categories.map((c, i) => {
                  const t = transforms[i];
                  const isCenter = i === active;
                  return (
                    <motion.div
                      key={i}
                      variants={cardVariants}
                      whileHover={!reduceMotion ? "hover" : undefined}
                      onClick={() => setActive(i)}
                      style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        width: (t?.CARD_W || 340) + (isCenter ? 30 : 8),
                        height: (t?.CARD_H || 360) + (isCenter ? 30 : 8),
                        transform: `translate(-50%, -50%) translateX(${t.translateX}px) translateY(${t.translateY}px) translateZ(${t.translateZ}px) rotateY(${t.rotateY}deg) scale(${t.scale})`,
                        transformStyle: "preserve-3d",
                        transition: `transform ${TRANS_DUR}ms cubic-bezier(.2,.9,.2,1), filter ${TRANS_DUR}ms, opacity ${TRANS_DUR}ms`,
                        zIndex: t.zIndex,
                        borderRadius: t.borderRadius,
                        overflow: "hidden",
                        boxShadow: isCenter ? "0 48px 110px rgba(16,24,40,0.18)" : "0 18px 40px rgba(16,24,40,0.06)",
                        background: "#fff",
                        display: "flex",
                        alignItems: "flex-end",
                        willChange: "transform, filter, opacity",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        src={c.image}
                        alt={c.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                          filter: `saturate(${1 - t.desat}) blur(${t.blur}px) brightness(${t.opacity === 1 ? 1 : 0.985})`,
                          backfaceVisibility: "hidden",
                        }}
                      />

                      <div
                        style={{
                          position: "absolute",
                          left: 18,
                          bottom: 20,
                          color: "white",
                          textShadow: "0 8px 26px rgba(0,0,0,0.6)",
                          pointerEvents: "none",
                        }}
                      >
                        <div style={{ fontSize: 15, fontWeight: 800, lineHeight: 1 }}>{c.name}</div>
                        {c.subtitle && <div style={{ fontSize: 12, opacity: 0.95 }}>{c.subtitle}</div>}
                      </div>

                      {isCenter && (
                        <div
                          style={{
                            position: "absolute",
                            inset: 6,
                            borderRadius: 14,
                            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
                            pointerEvents: "none",
                            border: "1px solid rgba(255,255,255,0.06)",
                          }}
                        />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>

          {/* Play/Pause control (desktop only) */}
          {!isMobile && !reduceMotion && (
            <div style={{ position: "absolute", right: 18, bottom: 18, zIndex: 6000 }}>
              <button
                onClick={toggleAutoplay}
                aria-label={autoplayRunning ? "Pause autoplay" : "Start autoplay"}
                className="bg-white/95 backdrop-blur-sm px-3 py-2 rounded-full shadow-md hover:shadow-lg transition flex items-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-gray-800">
                  {autoplayRunning ? (
                    // pause icon
                    <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="6" y="5" width="4" height="14" rx="1" />
                      <rect x="14" y="5" width="4" height="14" rx="1" />
                    </g>
                  ) : (
                    // play icon
                    <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 3v18l15-9L5 3z" fill="currentColor" />
                    </g>
                  )}
                </svg>
                <span className="text-sm text-gray-800">{autoplayRunning ? "Pause" : "Play"}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* bottom tint */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 64,
          pointerEvents: "none",
          background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,240,238,0.9) 100%)",
        }}
      />
    </section>
  );
}
