"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

// ─── To add/remove nav links: edit this array ─────────────────────────────────
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

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-[950] flex items-center justify-between transition-all duration-500",
          scrolled
            ? "bg-[#080808]/85 backdrop-blur-xl border-b border-brand-yellow/10 py-3 px-5 sm:px-8 md:px-12"
            : "py-5 sm:py-6 px-5 sm:px-8 md:px-12"
        )}
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-chillax font-bold text-xl sm:text-2xl tracking-[3px] sm:tracking-[4px] text-brand-yellow"
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

        {/* Desktop CTA */}
        <a
          href="#cta"
          className="hidden md:block bg-brand-yellow text-brand-black font-bold text-xs tracking-[2px] uppercase px-6 py-2.5 rounded hover:bg-brand-yellow-dark transition-colors duration-200"
        >
          Order Now
        </a>

        {/* Hamburger */}
        <button
          className="md:hidden text-brand-yellow p-2 -mr-2 touch-manipulation"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.32, ease: "easeInOut" }}
            className="fixed inset-0 z-[940] bg-brand-black flex flex-col items-center justify-center gap-8 px-8"
          >
            {/* Close button */}
            <button
              className="absolute top-5 right-5 text-brand-yellow p-2"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>

            {/* Logo */}
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="font-chillax font-bold text-2xl tracking-[4px] text-brand-yellow mb-4"
            >
              CHEEZIOUS
            </Link>

            {/* Nav links */}
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 + 0.1 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-chillax font-bold text-4xl sm:text-5xl tracking-[3px] sm:tracking-[4px] text-brand-white hover:text-brand-yellow transition-colors duration-200 block text-center"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: NAV_LINKS.length * 0.06 + 0.15 }}
            >
              <a
                href="#cta"
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-block bg-brand-yellow text-brand-black font-bold text-sm tracking-[2px] uppercase px-10 py-3.5 rounded"
              >
                Order Now
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
