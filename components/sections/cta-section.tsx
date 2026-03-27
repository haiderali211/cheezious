"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

export default function CtaSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="cta"
      ref={ref}
      className="relative text-center py-24 sm:py-36 px-5 sm:px-8 md:px-12 bg-brand-black-mid overflow-hidden"
    >
      {/* Radial yellow glow from bottom */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_100%,rgba(255,214,0,0.13),transparent)] pointer-events-none" />

      {/* Decorative background text */}
      <span className="absolute inset-0 flex items-center justify-center font-chillax font-bold text-[22vw] text-white/[0.02] leading-none select-none pointer-events-none overflow-hidden">
        CHEEZIOUS
      </span>

      <div
        className="relative z-10"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        <p className="text-[0.65rem] tracking-[4px] uppercase text-brand-yellow font-bold mb-5 sm:mb-6">
          Ready to Order?
        </p>

        <h2
          className="font-chillax font-bold text-brand-white leading-none tracking-wide mb-4"
          style={{ fontSize: "clamp(3rem, 10vw, 9rem)" }}
        >
          HUNGRY?
          <span className="block text-brand-yellow">ORDER NOW.</span>
        </h2>

        <p
          className="text-brand-gray text-sm sm:text-base mb-10 sm:mb-12 max-w-md mx-auto leading-7"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease 0.15s, transform 0.8s ease 0.15s",
          }}
        >
          Hot, fresh pizza delivered to your door in under 30 minutes.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease 0.25s, transform 0.8s ease 0.25s",
          }}
        >
          <a
            href="#"
            className="inline-flex items-center justify-center gap-3 bg-brand-yellow text-brand-black font-bold text-sm tracking-[2px] uppercase px-9 sm:px-10 py-4 rounded hover:bg-brand-yellow-dark transition-colors duration-200 group w-full sm:w-auto touch-manipulation"
          >
            Order Online
            <span className="group-hover:translate-x-1 transition-transform duration-200">
              →
            </span>
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center border border-brand-yellow/40 text-brand-yellow font-bold text-sm tracking-[2px] uppercase px-9 sm:px-10 py-4 rounded hover:bg-brand-yellow/8 hover:border-brand-yellow transition-all duration-200 w-full sm:w-auto touch-manipulation"
          >
            Find a Location
          </a>
        </div>
      </div>
    </section>
  );
}
