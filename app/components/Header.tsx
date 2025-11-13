"use client";

import React, { useEffect, useRef, useState } from "react";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";

interface NavbarProps {
  className?: string;
}

export default function Header({ className = "" }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // close on escape / outside click
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onClick(e: MouseEvent) {
      if (!open) return;
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  // return focus to menu button when closing
  useEffect(() => {
    if (!open) menuButtonRef.current?.focus();
  }, [open]);

  const navLinks = [
    { label: "HOME", href: "#" },
    { label: "SHOP", href: "#" },
    { label: "ABOUT US", href: "#" },
    { label: "BLOG", href: "#" },
    { label: "CONTACT US", href: "#" },
  ];

  return (
    <header className={`${className} bg-transparent `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shrink-0">
              <span className="text-white text-sm font-bold">B</span>
            </div>
            <span className="text-xl font-serif font-medium select-none">Brownow</span>
          </div>

          {/* Middle: Desktop nav */}
          <nav className="hidden md:flex items-center space-x-6" aria-label="Primary">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium hover:text-orange-500 transition inline-flex items-center"
              >
                {link.label}
                {/* keep the small caret for multi-level hints */}
                {(link.label === "SHOP" || link.label === "ABOUT US") && (
                  <span className="ml-1 text-xs" aria-hidden>
                    ▼
                  </span>
                )}
              </a>
            ))}
          </nav>

          {/* Right: Icons / Mobile button */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <button
                className="p-2 hover:bg-black/10 rounded-full transition"
                aria-label="Search"
                title="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                className="p-2 hover:bg-black/10 rounded-full transition"
                aria-label="Cart"
                title="Cart"
              >
                <ShoppingCart className="w-5 h-5" />
              </button>
              <button
                className="flex items-center gap-1 hover:text-orange-500 transition px-2 py-1 rounded-full"
                aria-label="User"
                title="User"
              >
                <User className="w-5 h-5" />
                <span className="text-sm hidden sm:inline">USER</span>
                <span className="text-xs hidden sm:inline">▼</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                ref={menuButtonRef}
                onClick={() => setOpen((s) => !s)}
                aria-controls="mobile-menu"
                aria-expanded={open}
                aria-haspopup="true"
                className="p-2 rounded-md hover:bg-black/10 transition inline-flex items-center justify-center"
              >
                {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu (small devices) */}
     <div
  id="mobile-menu"
  ref={menuRef}
  className={`md:hidden bg-white transform-gpu transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden ${
    open ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
  }`}
  aria-hidden={!open}
>

        <div className="px-4 pt-4 pb-6 border-t">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-2 px-3 rounded-md text-sm font-medium hover:bg-black/5 transition inline-flex items-center justify-between"
              >
                {link.label}
                {(link.label === "SHOP" || link.label === "ABOUT US") && (
                  <span className="text-xs ml-2">▼</span>
                )}
              </a>
            ))}
          </div>

          <div className="mt-4 border-t pt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-black/10 rounded-full transition" aria-label="Search">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-black/10 rounded-full transition" aria-label="Cart">
                <ShoppingCart className="w-5 h-5" />
              </button>
            </div>

            <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-black/5 transition">
              <User className="w-5 h-5" />
              <span className="text-sm">USER</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
