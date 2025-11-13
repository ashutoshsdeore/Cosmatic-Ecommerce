"use client";

import React, { useCallback, useMemo, useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export default function SeeTheWorldCurvedLearnMore() {
  const shouldReduceMotion = useReducedMotion();
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  const rightImages = useMemo(
    () => [
      { src: "/products.jpg", alt: "Skincare product 1", h: 56 },
      { src: "/skins.jpg", alt: "Skincare product 2", h: 56 },
      { src: "/product3.jpg", alt: "Fragrance bottles", h: 72 },
    ],
    []
  );

  const container = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.06, when: "beforeChildren" } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.52, ease: [0.2, 0.9, 0.2, 1] } },
  };
  const imgFloat = (i = 0) => ({
    hidden: { opacity: 0, y: 24, scale: 0.992 },
    show: { opacity: 1, y: 0, scale: 1, transition: { delay: 0.06 * i + 0.06, duration: 0.68, ease: [0.2, 0.9, 0.2, 1] } },
  });

  // pointer parallax handler (low-cost, throttled by requestAnimationFrame)
  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (shouldReduceMotion) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    // gentle movement
    setPointer({ x: x * 18, y: y * 12 });
  }, [shouldReduceMotion]);

  return (
    <motion.section
      className="py-12 sm:py-16 lg:py-24 bg-white"
      initial={shouldReduceMotion ? undefined : "hidden"}
      animate={shouldReduceMotion ? undefined : "show"}
      variants={container}
      onPointerMove={onPointerMove}
      aria-labelledby="see-the-world-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-start">
          {/* LEFT */}
          <motion.div className="space-y-6 sm:space-y-8" variants={fadeUp as any}>
            <h2 id="see-the-world-title" className="text-3xl sm:text-4xl lg:text-5xl font-serif leading-tight text-gray-900">
              SEE THE WORLD
              <br />
              IN STYLE
            </h2>

            <motion.div
              className="bg-black text-white rounded-3xl p-5 sm:p-6 lg:p-8 shadow-lg max-w-md"
              variants={fadeUp as any}
              whileHover={shouldReduceMotion ? {} : { y: -6 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>

                <div>
                  <div className="text-lg sm:text-xl font-semibold">Affordable Luxury</div>
                  <p className="text-sm text-gray-300 mt-2 max-w-sm">It is a long established fact that a reader will be distracted.</p>
                </div>
              </div>
            </motion.div>

            <motion.div className="space-y-3 max-w-sm" variants={fadeUp as any}>
              <div className="flex items-center gap-4 bg-white rounded-full px-4 py-2 shadow-sm">
                <div className="w-3 h-3 bg-gray-300 rounded-full flex-shrink-0" />
                <span className="text-gray-700 text-sm">Lab Tested Approved Formulas</span>
              </div>

              <div className="flex items-center gap-4 bg-white rounded-full px-4 py-2 shadow-sm">
                <div className="w-3 h-3 bg-gray-300 rounded-full flex-shrink-0" />
                <span className="text-gray-700 text-sm">100% Natural</span>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT */}
          <div className="grid grid-cols-2 gap-4 items-start">
            {/* Left stack */}
            <div className="space-y-4">
              {rightImages.slice(0, 2).map((img, i) => (
                <motion.div
                  key={img.src}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg h-40 sm:h-52 md:h-56"
                  variants={imgFloat(i) as any}
                  initial="hidden"
                  animate="show"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.02, translateY: -6 }}
                  style={{ transform: `translate3d(${pointer.x * (i === 0 ? -0.04 : -0.02)}px, ${pointer.y * 0.04}px, 0)` }}
                >
                  <img src={img.src} alt={img.alt} loading="lazy" className="w-full h-full object-cover" />
                </motion.div>
              ))}
            </div>

            {/* Right large card with curved button */}
            <div className="pt-2 lg:pt-6">
              <motion.div
                className="relative bg-white rounded-2xl overflow-visible"
                variants={imgFloat(20)as any}
                initial="hidden"
                animate="show"
                whileHover={shouldReduceMotion ? {} : { y: -10, boxShadow: "0 20px 60px rgba(11,11,11,0.12)" }}
                style={{ willChange: "transform, box-shadow", transform: `translate3d(${pointer.x * 0.06}px, ${pointer.y * 0.05}px, 0)` }}
              >
                {/* reveal mask (CSS clip-path) for high-level entrance animation */}
                <div className="overflow-hidden rounded-2xl">
                  <motion.img
                    src={rightImages[2].src}
                    alt={rightImages[2].alt}
                    loading="lazy"
                    className="w-full h-48 sm:h-64 lg:h-80 object-cover block"
                    initial={{ scale: 1.06, clipPath: "inset(100% 0 0 0)" }}
                    animate={{ scale: 1, clipPath: "inset(0% 0 0 0)" }}
                    transition={{ duration: 0.9, ease: [0.2, 0.9, 0.2, 1] }}
                    style={{ willChange: "transform, clip-path" }}
                  />
                </div>

                {/* Caption */}
                <div className="absolute left-4 bottom-36 sm:bottom-40 lg:bottom-48 text-gray-800" style={{ textShadow: "0 6px 18px rgba(0,0,0,0.45)" }}>
                  <div className="text-sm sm:text-base font-semibold">Affordable Luxury</div>
                  <div className="text-xs sm:text-sm text-gray-800 mt-1 max-w-xs">It is a long established fact that a reader will be distracted.</div>
                </div>

                {/* Curved Learn More */}
                <div className="absolute right-4 bottom-[-22px] sm:bottom-[-26px] md:bottom-[-28px] lg:bottom-[-30px] z-10" style={{ pointerEvents: "auto" }}>
                  <motion.a
                    href="#learn"
                    role="button"
                    aria-label="Learn more about product"
                    className="relative inline-flex items-center gap-3 rounded-[40px] bg-white px-5 py-3 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
                    whileHover={shouldReduceMotion ? {} : { scale: 1.03, translateX: 6 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    style={{ clipPath: "path('M0,20 Q10,0 40,0 L160,0 Q190,0 200,20 L200,40 Q190,60 160,60 L40,60 Q10,60 0,40 Z')" }}
                  >
                    <span className="text-sm font-medium text-gray-900">Learn More</span>

                    <motion.svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      animate={shouldReduceMotion ? undefined : { x: [0, 6, 0] }}
                      transition={shouldReduceMotion ? undefined : { repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                    >
                      <path d="M5 12H19M13 5L20 12L13 19" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </motion.svg>
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
