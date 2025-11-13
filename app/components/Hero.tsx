"use client";

import React, { useRef, useState } from "react";
import Header from "./Header";
import { motion, useReducedMotion } from "framer-motion";

export default function Hero(): JSX.Element {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const avatars = ["/a1.jpg", "/a2.jpg", "/a3.jpg", "/a4.jpg"];

  function handlePlayClick() {
    const v = videoRef.current;
    if (!v) return;

    if (v.paused) {
      v.play().catch(() => {});
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  }

  function handleVideoEnded() {
    setIsPlaying(false);
    const v = videoRef.current;
    if (v) v.currentTime = 0;
  }

  // motion variants
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.48, ease: [0.2, 0.9, 0.2, 1] } },
  };

  const floatIn = (delay = 0) => ({
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { delay, duration: 0.6, ease: [0.2, 0.9, 0.2, 1] } },
  });

  return (
    <section
      className="relative overflow-hidden"
      aria-label="Hero"
      style={{
        backgroundImage:
          "radial-gradient(circle at 78% 30%, rgba(255,247,242,0.65) 0%, transparent 28%), linear-gradient(135deg, rgba(251,231,212,0.38) 0%, rgba(255,243,236,0.35) 100%), url('/peachbg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "right center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* decorative bottom straight line */}
      <div className="absolute left-0 right-0 bottom-0 pointer-events-none z-10">
        <svg viewBox="0 0 1440 220" preserveAspectRatio="none" className="w-full h-[6.5rem] md:h-[8rem] lg:h-[10rem] block">
          <path d="M0,60 L1440,60 L1440,220 L0,220 Z" fill="#ffffff" />
        </svg>
      </div>

      {/* right-bottom white curved panel (hidden on md and down) */}
      <div className="pointer-events-none absolute bottom-0 right-0 z-20 hidden lg:block" style={{ width: "48%", maxWidth: 980, height: 260 }}>
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "#ffffff",
            borderTopLeftRadius: "8rem",
            borderTopRightRadius: "2.4rem",
            borderBottomRightRadius: "0.9rem",
            borderBottomLeftRadius: "0",
          }}
        />
      </div>

      {/* ===== HEADER OVERLAY INSIDE HERO =====
          - Absolute positioned inside the hero
          - Responsive padding and safe-area aware
          - Subtle entrance animation, respects prefers-reduced-motion
      */}
      <div className="absolute inset-x-0 top-0 z-50">
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 420, ease: [0.2, 0.9, 0.2, 1] }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4"
        >
          {/* keep Header usage identical, but ensure it inherits layout props */}
          <Header className="relative z-50 text-gray-900" />
        </motion.div>
      </div>

      <div className="relative z-30">
        <motion.div
          className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-36" // increased top padding so header overlay doesn't overlap main content
          initial={shouldReduceMotion ? undefined : "hidden"}
          animate={shouldReduceMotion ? undefined : "show"}
          variants={container}
        >
          <div className="grid lg:grid-cols-2 items-start gap-10 lg:gap-16 relative">
            {/* LEFT */}
            <motion.div className="relative pt-4 z-10" variants={fadeUp}>
              <div className="max-w-xl">
                <h1
                  className="font-serif font-extrabold leading-tight"
                  style={{
                    fontSize: "clamp(2.25rem, 5.2vw, 4.5rem)",
                    lineHeight: 0.95,
                    color: "#0b0b0b",
                    letterSpacing: "-0.02em",
                  }}
                >
                  REVEAL YOUR
                  <br />
                  BEAUTY <span className="italic text-orange-400 font-medium" style={{ fontSize: "0.55em", marginLeft: 6 }}>with</span>
                  <br />
                  SKINCARE
                </h1>

                <p className="mt-6 text-base md:text-lg text-gray-700 leading-7" style={{ maxWidth: 520 }}>
                  Concentrated in each drop of our award-winning range, our formula helps skin slow down signs of aging and find its healthy-looking state for good.
                </p>

                <motion.div className="mt-8 flex flex-col sm:flex-row sm:items-start sm:gap-8" variants={fadeUp}>
                  <motion.a
                    href="#shop"
                    className="inline-flex items-center gap-3 rounded-full px-5 py-2.5 font-medium text-sm transition shadow-sm"
                    style={{ color: "rgb(235,111,76)", border: "1.5px solid rgba(235,111,76,0.18)", background: "rgba(251,231,212,0.06)" }}
                    whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                  >
                    <span className="flex items-center justify-center rounded-full" style={{ width: 34, height: 34, borderRadius: 9999, border: "1px solid rgba(235,111,76,0.22)", background: "rgba(255,255,255,0.95)" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h12M12 5l7 7-7 7" stroke="rgb(235,111,76)" strokeWidth="1.6" />
                      </svg>
                    </span>
                    SHOP NOW
                  </motion.a>

                  <motion.div className="flex flex-col mt-4 sm:mt-0" variants={fadeUp}>
                    <div className="flex items-center gap-4">
                      <motion.div className="flex -space-x-3" initial={{}} animate={{}}>
                        {avatars.map((src, i) => (
                          <motion.div
                            key={i}
                            className="w-10 h-10 rounded-full border-2 border-white overflow-hidden"
                            style={{ boxShadow: "0 6px 18px rgba(0,0,0,0.08)" }}
                            whileHover={shouldReduceMotion ? {} : { y: -4 }}
                            transition={{ type: "spring", stiffness: 300, damping: 22 }}
                          >
                            <img src={src} loading="lazy" className="w-full h-full object-cover" alt={`avatar-${i}`} />
                          </motion.div>
                        ))}
                      </motion.div>

                      <motion.div className="flex items-center gap-3" variants={fadeUp}>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((n) => (
                            <svg key={n} width="16" height="16" viewBox="0 0 24 24" fill="rgb(235,111,76)">
                              <path d="M12 .587l3.668 7.568L23 9.748l-5.5 5.356L18.334 24 12 20.013 5.666 24l1.834-8.896L1 9.748l7.332-1.593z" />
                            </svg>
                          ))}
                        </div>
                        <div className="text-sm text-gray-700">(2.5K Reviews)</div>
                      </motion.div>
                    </div>

                    <div className="mt-2 ml-[calc(40px+0.5rem)] text-xs text-gray-500">Happy Customers</div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* RIGHT */}
            <div className="relative w-full h-[380px] md:h-[460px] lg:h-[560px]">
              <motion.div
                className="absolute left-[-6px] lg:left-[8%] top-[18%] md:top-[22%] z-30"
                variants={floatIn(0.08)}
              >
                <BadgeC size={140} />
              </motion.div>

              {/* VIDEO CARD */}
              <motion.div
                className="absolute z-40 right-0 md:right-[-4rem] lg:right-[-8rem] bottom-[-7.5rem] sm:bottom-[rem]"
                style={{ width: "min(92vw, 650px)", maxWidth: 650 }}
                variants={floatIn(0.14)}
                initial={shouldReduceMotion ? undefined : "hidden"}
                animate={shouldReduceMotion ? undefined : "show"}
              >
                <div
                  className="relative overflow-hidden border border-white"
                  style={{
                    height: 160,
                    borderTopLeftRadius: "2.6rem",
                    borderBottomLeftRadius: "2.6rem",
                    borderTopRightRadius: "1.2rem",
                    borderBottomRightRadius: "1.2rem",
                  }}
                >
                  <video
                    ref={videoRef}
                    src="/cosmatic.mp4"
                    className="w-full h-full object-cover"
                    onEnded={handleVideoEnded}
                    playsInline
                    muted
                    controls={false}
                    preload="metadata"
                  />

                  {!isPlaying && (
                    <button
                      onClick={handlePlayClick}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg backdrop-blur-sm transition-transform"
                    >
                      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="rgb(235,111,76)">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  )}

                  {isPlaying && (
                    <button
                      onClick={handlePlayClick}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 flex items-center justify-center transition-transform"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="rgb(235,111,76)">
                        <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                      </svg>
                    </button>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* Badge Component */
function BadgeC({ size = 140 }: { size?: number }) {
  const s = size;
  const R = s / 2 - 10;
  const cx = s / 2;
  const cy = s / 2;
  const topArc = `M ${cx - R} ${cy} A ${R} ${R} 0 1 1 ${cx + R} ${cy}`;

  return (
    <div style={{ width: s, height: s }} className="relative rounded-full bg-white">
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        <defs>
          <filter id="drop" width="200%" height="200%">
            <feDropShadow dx="0" dy="8" stdDeviation="18" floodColor="rgba(187,138,116,0.12)" />
          </filter>
          <path id="topPath" d={topArc} />
        </defs>

        <g filter="url(#drop)">
          <circle cx={cx} cy={cy} r={R + 10} fill="#fff" />
        </g>

        <circle cx={cx} cy={cy} r={R - 5} fill="none" stroke="rgba(11,11,11,0.6)" strokeWidth="1.4" />

        <text fontFamily="Inter, sans-serif" fontSize={s * 0.057} fill="#0b0b0b" letterSpacing="1">
          <textPath href="#topPath" startOffset="50%" textAnchor="middle">
            PREMIUM SKIN CARE PRODUCTS
          </textPath>
        </text>

        <g transform={`translate(${cx}, ${cy - 6})`} fill="#fb7b47">
          <path d="M0 -12 L2 -3 L9 -3 L3 1 L5 12 L0 6 L-5 12 L-3 1 L-9 -3 L-2 -3 Z" />
        </g>

        <path
          d={`M ${cx - R * 0.55} ${cy + R * 0.45} 
             Q ${cx} ${cy + R * 0.75} 
               ${cx + R * 0.55} ${cy + R * 0.45}`}
          stroke="#0b0b0b"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
