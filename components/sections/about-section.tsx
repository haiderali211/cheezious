"use client";

import Image from "next/image";
import { useRef } from "react";
import { useInView } from "framer-motion";

// ─── Stats — easy to update ──────────────────────────────────────────────────
const STATS = [
  { num: "80+", label: "Locations" },
  { num: "2M+", label: "Happy Guests" },
  { num: "40+", label: "Menu Items" },
];

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 py-20 sm:py-28 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center"
    >
      {/* Visual */}
      <div
        className="relative"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateX(0)" : "translateX(-40px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80"
            alt="Cheezious pizza being made"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        {/* Badge — positioned to stay within the image on all screen sizes */}
        <div className="absolute -bottom-5 right-2 sm:-bottom-6 sm:-right-4 md:-right-8 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-brand-yellow flex flex-col items-center justify-center shadow-xl z-10">
          <span className="font-chillax font-bold text-2xl sm:text-3xl text-brand-black leading-none">
            25+
          </span>
          <span className="text-[0.5rem] sm:text-[0.55rem] tracking-[2px] uppercase text-brand-black font-bold mt-1">
            Years
          </span>
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateX(0)" : "translateX(40px)",
          transition: "opacity 0.8s ease 0.15s, transform 0.8s ease 0.15s",
        }}
      >
        <p className="text-[0.65rem] tracking-[4px] uppercase text-brand-yellow font-bold mb-4">
          Our Story
        </p>
        <h2
          className="font-chillax font-bold text-brand-white leading-none tracking-wide mb-6"
          style={{ fontSize: "clamp(2.2rem, 6vw, 5rem)" }}
        >
          Born From<br />
          <span className="text-brand-yellow">Pure Passion</span>
        </h2>
        <p className="text-brand-gray text-sm sm:text-base leading-7 sm:leading-8 mb-10 sm:mb-12 max-w-md">
          Since 1999, Cheezious has been Pakistan&apos;s home of legendary pizza.
          Every pie is hand-stretched, generously loaded, and fired in our stone
          ovens — because you deserve nothing less than extraordinary.
        </p>

        {/* Stats */}
        <div className="flex gap-8 sm:gap-10 md:gap-14">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col">
              <span className="font-chillax font-bold text-brand-yellow text-3xl sm:text-4xl leading-none">
                {s.num}
              </span>
              <span className="text-[0.62rem] sm:text-[0.68rem] tracking-[2px] uppercase text-brand-gray mt-1.5">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
