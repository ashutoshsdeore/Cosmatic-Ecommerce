"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ShopByCategory() {
  const categories = [
    { name: "SKIN & HAIRCARE", image: "/hair.webp" },
    { name: "MAKEUP", image: "/makeup.jpeg" },
    { name: "BATH & SHOWER", image: "/bath.webp" },
    { name: "FRAGRANCES", image: "/sent.webp" },
  ];

  // Card animation
  const card = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 280, damping: 26 } },
    hover: { scale: 1.03, y: -6, transition: { type: "spring", stiffness: 380, damping: 22 } },
  };

  const imageHover = {
    hover: { scale: 1.06, transition: { duration: 0.45, ease: "easeOut" } },
  };

  return (
    <section className="py-12 lg:py-16 bg-[#FFF7F5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl lg:text-4xl font-serif mb-10 text-left text-gray-900">
          SHOP BY CATEGORY
        </h2>

        {/* Responsive grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="
            grid gap-5
            grid-cols-1 sm:grid-cols-2
            lg:grid-cols-3 lg:grid-rows-2
          "
        >
          {/* LEFT */}
          <motion.div
            variants={card as any}
            whileHover="hover"
            className="
              col-span-1 sm:col-span-1 
              lg:row-span-2 
              rounded-2xl overflow-hidden relative shadow-md hover:shadow-xl
              transition-all duration-300
            "
          >
            <motion.img
              src={categories[0].image}
              alt={categories[0].name}
              variants={imageHover as any}
              className="w-full h-[320px] sm:h-[360px] lg:h-[420px] object-cover transition-transform duration-500"
            />
            {/* ORIGINAL NAME BOX — UNTOUCHED */}
            <div className="absolute bottom-4 left-4 bg-white/95 text-gray-900 text-[13px] font-medium px-3 py-1 rounded shadow-sm">
              {categories[0].name}
            </div>
          </motion.div>

          {/* MIDDLE TOP */}
          <motion.div
            variants={card as any}
            whileHover="hover"
            className="
              rounded-2xl overflow-hidden relative shadow-md hover:shadow-xl 
              transition-all duration-300
            "
          >
            <motion.img
              src={categories[1].image}
              alt={categories[1].name}
              variants={imageHover as any}
              className="w-full h-[180px] sm:h-[200px] lg:h-[200px] object-cover transition-transform duration-500"
            />
            {/* UNTOUCHED NAME BOX */}
            <div className="absolute bottom-3 left-3 bg-white/95 text-gray-900 text-[13px] font-medium px-2.5 py-0.5 rounded shadow-sm">
              {categories[1].name}
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            variants={card as any}
            whileHover="hover"
            className="
              col-span-1 sm:col-span-1
              lg:row-span-2
              rounded-2xl overflow-hidden relative shadow-md hover:shadow-xl
              transition-all duration-300
            "
          >
            <motion.img
              src={categories[3].image}
              alt={categories[3].name}
              variants={imageHover as any}
              className="w-full h-[320px] sm:h-[360px] lg:h-[420px] object-cover transition-transform duration-500"
            />
            {/* UNTOUCHED NAME BOX */}
            <div className="absolute bottom-4 left-4 bg-white/95 text-gray-900 text-[13px] font-medium px-3 py-1 rounded shadow-sm">
              {categories[3].name}
            </div>
          </motion.div>

          {/* MIDDLE BOTTOM */}
          <motion.div
            variants={card as any}
            whileHover="hover"
            className="
              rounded-2xl overflow-hidden relative shadow-md hover:shadow-xl
              transition-all duration-300
            "
          >
            <motion.img
              src={categories[2].image}
              alt={categories[2].name}
              variants={imageHover as any}
              className="w-full h-[180px] sm:h-[200px] lg:h-[200px] object-cover transition-transform duration-500"
            />
            {/* UNTOUCHED NAME BOX */}
            <div className="absolute bottom-3 left-3 bg-white/95 text-gray-900 text-[13px] font-medium px-2.5 py-0.5 rounded shadow-sm">
              {categories[2].name}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
