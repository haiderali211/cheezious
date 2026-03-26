"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

// ─── To add/remove nav links: just edit this array ────────────────────────────
const NAV_LINKS = [
  { label: "Our Story", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Specials", href: "#specials" },
  { label: "Reviews", href: "#testimonials" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-[900] flex items-center justify-between transition-all duration-500",
          scrolled
            ? "bg-brand-black/80 backdrop-blur-xl border-b border-brand-yellow/10 py-3 px-8 md:px-12"
            : "py-6 px-8 md:px-12"
        )}
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-chillax font-bold text-2xl tracking-[4px] text-brand-yellow"
        >
          CHEEZIOUS
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-9 list-none">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="relative text-brand-white/70 hover:text-brand-yellow text-xs tracking-[2.5px] uppercase font-medium transition-colors duration-200 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-brand-yellow scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button className="hidden md:block bg-brand-yellow text-brand-black font-bold text-xs tracking-[2px] uppercase px-6 py-2.5 rounded hover:bg-brand-yellow-dark transition-colors duration-200">
          Order Now
        </button>

        {/* Hamburger */}
        <button
          className="md:hidden text-brand-yellow"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed inset-0 z-[850] bg-brand-black flex flex-col items-center justify-center gap-10"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-chillax font-bold text-5xl tracking-[4px] text-brand-white hover:text-brand-yellow transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => setMobileOpen(false)}
              className="mt-4 bg-brand-yellow text-brand-black font-bold text-sm tracking-[2px] uppercase px-8 py-3 rounded"
            >
              Order Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
