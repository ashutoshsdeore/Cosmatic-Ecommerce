"use client";

import { Instagram, Facebook, Youtube, Twitter } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export default function Footer() {
  const reduceMotion = useReducedMotion();

  // client-side handler
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;
    console.log("subscribe:", email);
    // provide quick feedback (you can replace this with a toast)
    form.reset();
  }

  // Framer variants (respect reduced motion)
  const containerV = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.08, when: "beforeChildren" } },
  };
  const itemV = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.48, ease: [0.2, 0.9, 0.2, 1] } },
  };
  const iconHover = { scale: 1.12, rotate: -6 };
  const btnHover = { y: -2, boxShadow: "0 10px 25px rgba(0,0,0,0.12)" };

  return (
    <footer className="bg-[#FFF3EC]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Top Row */}
        <motion.div
          initial={reduceMotion ? undefined : "hidden"}
          whileInView={reduceMotion ? undefined : "show"}
          viewport={{ once: true, amount: 0.12 }}
          variants={containerV}
          className="grid gap-8 items-start mb-12 grid-cols-1 md:grid-cols-12"
        >
          {/* Left - Brand + Socials */}
          <motion.div variants={itemV} className="md:col-span-3 flex flex-col items-start gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FB8C5A] rounded-full flex items-center justify-center text-white font-bold">
                B
              </div>
              <span className="font-serif text-lg text-black">Betowow</span>
            </div>

            <div className="flex items-center gap-4 mt-4">
              <motion.button
                whileHover={reduceMotion ? undefined : iconHover}
                className="p-2 hover:bg-white/70 rounded-full transition"
                aria-label="instagram"
                title="Instagram"
              >
                <Instagram className="w-5 h-5 text-gray-700" />
              </motion.button>
              <motion.button
                whileHover={reduceMotion ? undefined : iconHover}
                className="p-2 hover:bg-white/70 rounded-full transition"
                aria-label="facebook"
                title="Facebook"
              >
                <Facebook className="w-5 h-5 text-gray-700" />
              </motion.button>
              <motion.button
                whileHover={reduceMotion ? undefined : iconHover}
                className="p-2 hover:bg-white/70 rounded-full transition"
                aria-label="youtube"
                title="YouTube"
              >
                <Youtube className="w-5 h-5 text-gray-700" />
              </motion.button>
              <motion.button
                whileHover={reduceMotion ? undefined : iconHover}
                className="p-2 hover:bg-white/70 rounded-full transition"
                aria-label="twitter"
                title="Twitter"
              >
                <Twitter className="w-5 h-5 text-gray-700" />
              </motion.button>
            </div>
          </motion.div>

          {/* Right - Subscribe box */}
          <motion.div variants={itemV} className="md:col-span-9">
            <div className="bg-[#FB6F3F] rounded-lg p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-white max-w-xl">
                <h3 className="text-2xl font-semibold">Let’s Get In Touch!</h3>
                <p className="mt-2 text-sm opacity-90">
                  What’s inside? Exclusive sales, new arrivals & more.
                </p>
              </div>

              {/* Email input + Sign Up button */}
              <form onSubmit={handleSubmit} className="w-full md:w-auto flex justify-end">
                <div className="flex overflow-hidden rounded-md shadow-md w-full md:w-[320px] lg:w-[360px]">
                  <input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    required
                    className="flex-1 px-4 py-3 text-gray-900 text-sm bg-white outline-none border-none placeholder-gray-500"
                    aria-label="Email address"
                  />

                  <motion.button
                    type="submit"
                    whileHover={reduceMotion ? undefined : btnHover}
                    className="bg-black text-white px-6 py-3 text-sm font-semibold hover:bg-gray-900 transition whitespace-nowrap"
                    aria-label="Sign up"
                  >
                    SIGN UP
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Link Sections */}
        <motion.div
          initial={reduceMotion ? undefined : "hidden"}
          whileInView={reduceMotion ? undefined : "show"}
          viewport={{ once: true, amount: 0.12 }}
          variants={containerV}
          className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 pb-8 border-t border-gray-200 pt-10"
        >
          <motion.div variants={itemV}>
            <h4 className="font-medium mb-4">ABOUT COMPANY</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <a href="#" className="hover:text-[#FB6F3F] transition">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#FB6F3F] transition">
                  Shop
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#FB6F3F] transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#FB6F3F] transition">
                  FAQ
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={itemV}>
            <h4 className="font-medium mb-4">HELP INFORMATION</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <a href="#" className="hover:text-[#FB6F3F] transition">
                  Shipping Information
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#FB6F3F] transition">
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#FB6F3F] transition">
                  Payment Options
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#FB6F3F] transition">
                  Contact Us
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={itemV}>
            <h4 className="font-medium mb-4">TERMS OF SERVICE</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <a href="#" className="hover:text-[#FB6F3F] transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#FB6F3F] transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#FB6F3F] transition">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={itemV}>
            <h4 className="font-medium mb-4">ACCOUNT INFORMATION</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <a href="#" className="hover:text-[#FB6F3F] transition">
                  Login/Register
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#FB6F3F] transition">
                  Track Order
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#FB6F3F] transition">
                  Wishlist
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#FB6F3F] transition">
                  Account Details
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <div className="pt-6 text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} Betowow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
