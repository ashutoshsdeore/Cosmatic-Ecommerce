// app/components/PopularCollections.tsx
"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import React from "react";

export default function PopularCollections() {
  const products = [
    {
      name: "Chance Chanel Eau Tendre",
      category: "Perfume",
      price: 145.0,
      image: "/shopping.webp",
    },
    {
      name: "Aveeno Daily Moisturizing",
      category: "Body",
      price: 60.0,
      image: "/lotion.avif",
    },
    {
      name: "Max Studio Fit Fluid Foundation",
      category: "Face",
      price: 90.0,
      image: "/foundation.avif",
    },
    {
      name: "Calvin Klein Eternity",
      category: "Perfume",
      price: 130.0,
      image: "/Eternity.jpeg",
    },
  ];

  const reduceMotion = useReducedMotion();

  // Framer variants
  const containerVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.08, delayChildren: 0.06 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 12, scale: 0.995 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 28 } },
    hover: { y: -6, scale: 1.02, transition: { type: "spring", stiffness: 420, damping: 22 } },
    tap: { scale: 0.99 },
  };

  const imgHover = {
    hover: { scale: 1.07, transition: { duration: 0.45, ease: "easeOut" } },
  };

  return (
    <section className="py-10 sm:py-12 lg:py-16 bg-[#FBF7F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading + controls */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h2 className="text-lg md:text-xl lg:text-2xl font-serif uppercase tracking-wide">
            Our Popular Collections
          </h2>

          {/* Optional nav controls (kept commented - uncomment if you want) */}
          {/* <div className="flex items-center gap-2">
            <button aria-label="prev" className="w-9 h-9 bg-white rounded-full shadow-sm flex items-center justify-center hover:shadow-md transition">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button aria-label="next" className="w-9 h-9 bg-white rounded-full shadow-sm flex items-center justify-center hover:shadow-md transition">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div> */}
        </div>

        {/* Product grid: responsive */}
        <motion.div
          initial={reduceMotion ? undefined : "hidden"}
          whileInView={reduceMotion ? undefined : "show"}
          viewport={{ once: true, amount: 0.16 }}
          variants={containerVariants}
          className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        >
          {products.map((p, idx) => (
            <motion.article
              key={idx}
              role="article"
              tabIndex={0}
              aria-label={`${p.name} - ${p.category} - $${p.price.toFixed(2)}`}
              variants={cardVariants}
              whileHover={reduceMotion ? undefined : "hover"}
              whileTap={reduceMotion ? undefined : "tap"}
              className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition overflow-hidden focus:outline-none focus:ring-4 focus:ring-pink-50"
            >
              <div className="p-5 sm:p-6 flex flex-col items-center text-center gap-4">
                <motion.div
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl bg-gray-50 overflow-hidden flex items-center justify-center"
                  variants={imgHover}
                >
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={320}
                    height={320}
                    className="object-contain"
                    priority={idx === 0} // small perf hint for first image
                  />
                </motion.div>

                <div className="w-full">
                  <p className="text-xs text-gray-500 mb-1">{p.category}</p>
                  <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-2 line-clamp-2">
                    {p.name}
                  </h3>

                  <div className="flex items-center justify-between">
                    <span className="text-orange-500 font-semibold text-lg">
                      ${p.price.toFixed(2)}
                    </span>
                    <button
                      className="text-xs bg-[#FB8C5A] hover:bg-[#fb7a44] text-white px-3 py-1 rounded-full transition-transform transform-gpu hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-100"
                      aria-label={`Add ${p.name} to cart`}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* small centered control */}
        <div className="mt-6 md:mt-8 flex justify-center">
          <div className="w-12 h-12 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center">
            <span className="text-xs text-gray-500">View</span>
          </div>
        </div>
      </div>
    </section>
  );
}
