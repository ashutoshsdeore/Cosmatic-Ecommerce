"use client";

import React, { useRef, useState } from "react";
import Header from "./Header";
import { motion, useReducedMotion, Variants } from "framer-motion";

export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // now avatars include a display name + online flag
  const avatars: { src: string; name: string; online?: boolean }[] = [
    { src: "/a1.jpg", name: "Asha", online: true },
    { src: "/a2.jpg", name: "Rita", online: true },
    { src: "/a3.jpg", name: "Neel", online: false },
    { src: "/a4.jpg", name: "Vivek", online: true },
  ];

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

  // -- Motion variants (respect reduced motion)
  const appear: Variants = shouldReduceMotion
    ? { hidden: {}, show: {} }
    : {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
      };

  const headingVariant: Variants = shouldReduceMotion
    ? { hidden: {}, show: {} }
    : {
        hidden: { opacity: 0, y: -10, scale: 0.995 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, delay: 0.05, ease: "easeOut" } },
      };

  const avatarsContainer: Variants = shouldReduceMotion
    ? { hidden: {}, show: {} }
    : {
        hidden: {},
        show: { transition: { staggerChildren: 0.06, delayChildren: 0.18 } },
      };

  const avatarItemBase: Variants = shouldReduceMotion
    ? { hidden: {}, show: {} }
    : {
        hidden: { opacity: 0, x: -8 },
        show: { opacity: 1, x: 0, transition: { duration: 0.38, ease: "easeOut" } },
      };

  // bobbing float for idle animation on avatars
  const avatarFloat = shouldReduceMotion
    ? {}
    : {
        animate: { y: [0, -4, 0], transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut" } },
      };

  const badgeVariant: Variants = shouldReduceMotion
    ? { hidden: {}, show: {} }
    : {
        hidden: { opacity: 0, rotate: -8, scale: 0.85, x: -8 },
        show: { opacity: 1, rotate: 0, scale: 1, x: 0, transition: { duration: 0.7, ease: "backOut" } },
      };

  const videoCardVariant: Variants = shouldReduceMotion
    ? { hidden: {}, show: {} }
    : {
        hidden: { opacity: 0, x: 24 },
        show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut", delay: 0.12 } },
      };

  const playBtnPulse = shouldReduceMotion
    ? {}
    : {
        whileTap: { scale: 0.94 },
        whileHover: { scale: 1.06 },
      };

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
      {/* bottom straight line */}
      <div className="absolute left-0 right-0 bottom-0 pointer-events-none z-10">
        <svg viewBox="0 0 1440 220" preserveAspectRatio="none" className="w-full h-[6.5rem] md:h-[8rem] lg:h-[10rem] block">
          <path d="M0,60 L1440,60 L1440,220 L0,220 Z" fill="#ffffff" />
        </svg>
      </div>

      {/* right white curved panel (desktop only) */}
      <div
        className="pointer-events-none absolute bottom-0 right-0 z-20 hidden lg:block"
        style={{ width: "48%", maxWidth: 980, height: 260 }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "#ffffff",
            borderTopLeftRadius: "8rem",
            borderTopRightRadius: "2.4rem",
            borderBottomRightRadius: "0.9rem",
          }}
        />
      </div>

      {/* Header */}
      <div className="absolute inset-x-0 top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Header className="relative z-50 text-gray-900" />
        </div>
      </div>

      <div className="relative z-30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-36">
          <div className="grid lg:grid-cols-2 items-start gap-10 lg:gap-16 relative">
            {/* LEFT */}
            <motion.div className="relative pt-4 z-10" initial="hidden" animate="show" variants={appear}>
              <div className="max-w-xl">
                <motion.h1
                  className="font-serif font-extrabold leading-tight"
                  style={{
                    fontSize: "clamp(2.25rem, 5.2vw, 4.5rem)",
                    lineHeight: 0.95,
                    color: "#0b0b0b",
                    letterSpacing: "-0.02em",
                  }}
                  variants={headingVariant}
                >
                  REVEAL YOUR
                  <br />
                  BEAUTY{" "}
                  <span className="italic text-orange-400 font-medium" style={{ fontSize: "0.55em", marginLeft: 6 }}>
                    with
                  </span>
                  <br />
                  SKINCARE
                </motion.h1>

                <motion.p className="mt-6 text-base md:text-lg text-gray-700 leading-7" style={{ maxWidth: 520 }} variants={appear}>
                  Concentrated in each drop of our award-winning range, our formula helps skin slow down signs of aging and find its healthy-looking state for good.
                </motion.p>

                <div className="mt-8 flex flex-col sm:flex-row sm:items-start sm:gap-8">
                  <motion.a
                    href="#shop"
                    className="inline-flex items-center gap-3 rounded-full px-5 py-2.5 font-medium text-sm transition shadow-sm"
                    style={{ color: "rgb(235,111,76)", border: "1.5px solid rgba(235,111,76,0.18)", background: "rgba(251,231,212,0.06)" }}
                    variants={appear}
                    whileHover={!shouldReduceMotion ? { scale: 1.02 } : undefined}
                    {...(shouldReduceMotion ? {} : { transition: { type: "spring", stiffness: 260, damping: 20 } })}
                  >
                    <span
                      className="flex items-center justify-center rounded-full"
                      style={{ width: 34, height: 34, borderRadius: 9999, border: "1px solid rgba(235,111,76,0.22)", background: "rgba(255,255,255,0.95)" }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h12M12 5l7 7-7 7" stroke="rgb(235,111,76)" strokeWidth="1.6" />
                      </svg>
                    </span>
                    SHOP NOW
                  </motion.a>

                  {/* Avatars + rating */}
                  <div className="flex flex-col mt-4 sm:mt-0">
                    <motion.div className="flex items-center gap-4" initial="hidden" animate="show" variants={avatarsContainer}>
                      <div className="flex -space-x-3">
                        {avatars.map((a, i) => (
                          <motion.div key={i} variants={avatarItemBase}>
                            <ProfileAvatar
                              src={a.src}
                              name={a.name}
                              online={!!a.online}
                              index={i}
                              reducedMotion={shouldReduceMotion}
                              floatConfig={avatarFloat}
                            />
                          </motion.div>
                        ))}
                      </div>

                      <div className="flex items-center gap-3">
                        <motion.div className="flex items-center gap-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                          {[1, 2, 3, 4, 5].map((n) => (
                            <motion.svg
                              key={n}
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="rgb(235,111,76)"
                              initial={{ scale: 0.9, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.35, delay: 0.08 * n }}
                            >
                              <path d="M12 .587l3.668 7.568L23 9.748l-5.5 5.356L18.334 24 12 20.013 5.666 24l1.834-8.896L1 9.748l7.332-1.593z" />
                            </motion.svg>
                          ))}
                        </motion.div>
                        <motion.div className="text-sm text-gray-700" variants={appear}>
                          (2.5K Reviews)
                        </motion.div>
                      </div>
                    </motion.div>

                    <motion.div className="mt-2 ml-[calc(40px+0.5rem)] text-xs text-gray-500" variants={appear}>
                      Happy Customers
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT */}
            <div className="relative w-full h-[380px] md:h-[460px] lg:h-[560px]">
              {/* Badge */}
              <motion.div
                className="absolute left-[-6px] lg:left-[8%] top-[18%] md:top-[22%] z-30"
                style={{ originX: 0.5, originY: 0.5 }}
                variants={badgeVariant}
                initial="hidden"
                animate="show"
              >
                <BadgeC size={140} />
              </motion.div>

              {/* Video card */}
              <motion.div
                className="absolute z-40 right-0 md:right-[-4rem] lg:right-[-8rem] bottom-[-7.5rem]"
                style={{ width: "min(92vw, 650px)", maxWidth: 650 }}
                variants={videoCardVariant}
                initial="hidden"
                animate="show"
                whileHover={!shouldReduceMotion ? { y: -6, boxShadow: "0 30px 60px rgba(0,0,0,0.12)" } : undefined}
                transition={{ duration: 0.35 }}
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
                    <motion.button
                      onClick={handlePlayClick}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg backdrop-blur-sm"
                      aria-label="Play video"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.36, ease: "easeOut" }}
                      whileHover={!shouldReduceMotion ? { scale: 1.07 } : undefined}
                      whileTap={!shouldReduceMotion ? { scale: 0.96 } : undefined}
                    >
                      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="rgb(235,111,76)">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </motion.button>
                  )}

                  {isPlaying && (
                    <motion.button
                      onClick={handlePlayClick}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 flex items-center justify-center"
                      aria-label="Pause video"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.28 }}
                      whileHover={!shouldReduceMotion ? { scale: 1.04 } : undefined}
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="rgb(235,111,76)">
                        <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                      </svg>
                    </motion.button>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ProfileAvatar component: avatar with hover/focus animation + online pulse */
function ProfileAvatar({
  src,
  name,
  online,
  index,
  reducedMotion,
  floatConfig,
}: {
  src: string;
  name: string;
  online?: boolean;
  index: number;
  reducedMotion: boolean;
  floatConfig: any;
}) {
  // hover / focus variants
  const hoverVariant = reducedMotion
    ? {}
    : {
        hover: { scale: 1.12, y: -6, boxShadow: "0 10px 30px rgba(0,0,0,0.12)", transition: { duration: 0.18 } },
        focus: { scale: 1.12, y: -6, boxShadow: "0 10px 30px rgba(0,0,0,0.12)", transition: { duration: 0.18 } },
      };

  return (
    <motion.div
      className="relative"
      title={name}
      initial="rest"
      whileHover="hover"
      whileFocus="focus"
      animate="rest"
      style={{ zIndex: 10 - index }}
      {...(reducedMotion ? {} : { variants: { rest: {}, ...hoverVariant } })}
    >
      {/* floating animation applied to the wrapper (idle subtle movement) */}
      <motion.div
        className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-gray-100"
        style={{ boxShadow: "0 6px 18px rgba(0,0,0,0.08)" }}
        {...(reducedMotion ? {} : floatConfig)}
      >
        <img src={src} loading="lazy" className="w-full h-full object-cover" alt={name} />
      </motion.div>

      {/* online dot */}
      {online && (
        <span
          className="absolute right-0 bottom-0 w-3 h-3 rounded-full border-2 border-white"
          style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.06)" }}
        >
          {/* pulse ring */}
          <motion.span
            className="block rounded-full absolute inset-0"
            initial={{ scale: 1, opacity: 0.9 }}
            animate={reducedMotion ? {} : { scale: [1, 2.1], opacity: [0.9, 0], transition: { duration: 1.6, repeat: Infinity } }}
            style={{ background: "rgba(91, 200, 125, 0.15)" }}
          />
          <span className="block w-full h-full rounded-full" style={{ background: "#5bc87d", display: "block" }} />
        </span>
      )}

      {/* label that shows on hover/focus */}
      <motion.span
        className="absolute left-1/2 -translate-x-1/2 -bottom-8 pointer-events-none rounded-md px-2 py-1 text-xs text-white bg-black/70"
        initial={{ opacity: 0, y: 6, scale: 0.98 }}
        variants={reducedMotion ? {} : { hover: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.16 } }, focus: { opacity: 1, y: 0, scale: 1 } }}
        aria-hidden
      >
        {name}
      </motion.span>
    </motion.div>
  );
}

/* Badge Component (unchanged) */
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
