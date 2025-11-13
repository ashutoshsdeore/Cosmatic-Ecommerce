"use client";

import React, { useEffect, useRef, useState } from "react";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface NavbarProps {
  className?: string;
}

export default function Header({ className = "" }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const menuRef = useRef<HTMLDivElement | null>(null);

  // sticky/transparent on scroll state
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close on Escape and click outside; trap focus in mobile menu
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);

      if (open && e.key === "Tab") {
        const menu = menuRef.current;
        if (!menu) return;

        const focusable = menu.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    function onClick(e: MouseEvent) {
      if (!menuRef.current) return;
      if (open && !menuRef.current.contains(e.target as Node)) setOpen(false);
    }

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  // focus first element when opening menu
  useEffect(() => {
    if (!open) return;
    const menu = menuRef.current;
    if (!menu) return;
    const focusable = menu.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length > 0) focusable[0].focus();
  }, [open]);

  // lock body scroll when menu open
  useEffect(() => {
    const original = document.body.style.overflow;
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = original || "";
    }
    return () => {
      document.body.style.overflow = original || "";
    };
  }, [open]);

  // simple motion variants (snappy)
  const backdropVars = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.12 } },
  };
  const panelVars = {
    hidden: { x: "100%" },
    show: { x: 0, transition: { type: "spring", stiffness: 360, damping: 36, duration: 0.18 } },
  };

  // Determine header background state:
  // - solid background when scrolled OR when menu is open
  const headerIsSolid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-60 ${className}`}
    >
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${
          headerIsSolid ? "bg-white/95 shadow-sm" : "bg-transparent"
        }`}
        style={{
          WebkitBackdropFilter: headerIsSolid ? "saturate(1.05) blur(6px)" : undefined,
          backdropFilter: headerIsSolid ? "saturate(1.05) blur(6px)" : undefined,
        }}
      >
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center shrink-0">
              <span className={`text-white text-sm font-bold select-none`}>B</span>
            </div>
            <a
              href="#"
              className={`text-xl font-serif ${headerIsSolid ? "text-slate-900" : "text-white"} hover:text-orange-500 transition-colors`}
              aria-label="Brownow home"
            >
             Betowow.
            </a>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Primary Navigation">
            <ul className="flex items-center gap-8">
              <li><a href="#" className={`text-sm font-medium transition-colors ${headerIsSolid ? "text-slate-700" : "text-white"}`}>HOME</a></li>
              <li><a href="#" className={`text-sm font-medium transition-colors ${headerIsSolid ? "text-slate-700" : "text-white"}`}>SHOP <span className="ml-1 text-xs">▼</span></a></li>
              <li><a href="#" className={`text-sm font-medium transition-colors ${headerIsSolid ? "text-slate-700" : "text-white"}`}>ABOUT US <span className="ml-1 text-xs">▼</span></a></li>
              <li><a href="#" className={`text-sm font-medium transition-colors ${headerIsSolid ? "text-slate-700" : "text-white"}`}>BLOG</a></li>
              <li><a href="#" className={`text-sm font-medium transition-colors ${headerIsSolid ? "text-slate-700" : "text-white"}`}>CONTACT US</a></li>
            </ul>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-2">
              <button aria-label="Search" className={`p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300 ${headerIsSolid ? "hover:bg-black/5" : "hover:bg-white/12"}`}>
                <Search className={`w-5 h-5 ${headerIsSolid ? "text-slate-700" : "text-white"}`} />
              </button>

              <button aria-label="Cart" className={`relative p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300 ${headerIsSolid ? "hover:bg-black/5" : "hover:bg-white/12"}`}>
                <ShoppingCart className={`w-5 h-5 ${headerIsSolid ? "text-slate-700" : "text-white"}`} />
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">3</span>
              </button>

              <button aria-haspopup="true" aria-expanded={false} className={`flex items-center space-x-2 transition-colors focus:outline-none ${headerIsSolid ? "hover:text-orange-500 text-slate-700" : "hover:text-orange-200 text-white"}`}>
                <User className="w-5 h-5" />
                <span className="text-sm">USER</span>
                <span className="text-xs">▼</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((o) => !o)}
                className={`p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 transition-colors ${headerIsSolid ? "hover:bg-black/5" : "hover:bg-white/12"}`}
              >
                {open ? <X className={`w-5 h-5 ${headerIsSolid ? "text-slate-700" : "text-white"}`} /> : <Menu className={`w-5 h-5 ${headerIsSolid ? "text-slate-700" : "text-white"}`} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile slide-over menu (snappy, fixed, body lock) */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden fixed inset-0 z-60"
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={backdropVars}
            aria-hidden={!open}
          >
            {/* backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/40"
              onClick={() => setOpen(false)}
              variants={backdropVars}
            />

            {/* panel: full width on very small screens, 320px on larger small screens */}
            <motion.aside
              ref={menuRef}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile menu"
              className="absolute right-0 top-0 bottom-0 w-full sm:w-[320px] bg-white shadow-2xl p-6 flex flex-col gap-6"
              variants={panelVars}
              initial="hidden"
              animate="show"
              exit="hidden"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">B</span>
                  </div>
                  <span className="font-serif text-lg">Brownow</span>
                </div>
                <button onClick={() => setOpen(false)} className="p-2 rounded-md hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-orange-300" aria-label="Close menu">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-3">
                <a href="#" className="px-2 py-3 rounded-md hover:bg-slate-50 transition-colors font-medium">HOME</a>
                <a href="#" className="px-2 py-3 rounded-md hover:bg-slate-50 transition-colors font-medium">SHOP</a>
                <a href="#" className="px-2 py-3 rounded-md hover:bg-slate-50 transition-colors font-medium">ABOUT US</a>
                <a href="#" className="px-2 py-3 rounded-md hover:bg-slate-50 transition-colors font-medium">BLOG</a>
                <a href="#" className="px-2 py-3 rounded-md hover:bg-slate-50 transition-colors font-medium">CONTACT US</a>
              </nav>

              <div className="mt-auto flex items-center gap-3">
                <button aria-label="Search" className="p-2 hover:bg-black/5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300">
                  <Search className="w-5 h-5 text-slate-700" />
                </button>
                <button aria-label="Cart" className="relative p-2 hover:bg-black/5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300">
                  <ShoppingCart className="w-5 h-5 text-slate-700" />
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">3</span>
                </button>
                <button className="flex items-center space-x-2 hover:text-orange-500 transition-colors focus:outline-none">
                  <User className="w-5 h-5 text-slate-700" />
                  <span className="text-sm">USER</span>
                </button>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
