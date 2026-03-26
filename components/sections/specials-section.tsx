"use client";

import Image from "next/image";
import { useRef } from "react";
import { useInView } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────────────
   SpecialsSection — full-bleed split layout
   To update the deal: edit DEAL_CONTENT below
───────────────────────────────────────────────────────────────────────────── */

const DEAL_CONTENT = {
  tag: "This Week Only",
  title: ["MEGA", "DEAL", "SPECIAL"],
  description:
    "1 Large Pizza + Garlic Bread + 2 Soft Drinks — all at an unbeatable price. Limited time. Limited stock. Don't wait.",
  image:
    "https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=900&q=80",
  cta: "Grab the Deal",
};

export default function SpecialsSection() {
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const imageInView = useInView(imageRef, { once: true, margin: "-100px" });
  const contentInView = useInView(contentRef, { once: true, margin: "-100px" });

  return (
    <section id="specials" className="w-full grid grid-cols-1 md:grid-cols-2">
      {/* Image */}
      <div
        ref={imageRef}
        className="relative aspect-square overflow-hidden"
        style={{
          opacity: imageInView ? 1 : 0,
          transform: imageInView ? "translateX(0)" : "translateX(-40px)",
          transition: "opacity 0.85s ease, transform 0.85s ease",
        }}
      >
        <Image
          src={DEAL_CONTENT.image}
          alt="Cheezious Special Deal"
          fill
          className="object-cover hover:scale-105 transition-transform duration-700"
        />
        {/* Yellow corner accent */}
        <div className="absolute bottom-0 left-0 w-40 h-1 bg-brand-yellow" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="bg-brand-black-mid flex flex-col justify-center px-10 md:px-16 lg:px-24 py-20"
        style={{
          opacity: contentInView ? 1 : 0,
          transform: contentInView ? "translateX(0)" : "translateX(40px)",
          transition: "opacity 0.85s ease 0.1s, transform 0.85s ease 0.1s",
        }}
      >
        <span className="inline-block bg-brand-yellow text-brand-black text-[0.65rem] font-bold tracking-[3px] uppercase px-3 py-1.5 rounded w-fit mb-8">
          {DEAL_CONTENT.tag}
        </span>

        <h2 className="font-chillax font-bold text-brand-white leading-none tracking-wide mb-6"
          style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
        >
          {DEAL_CONTENT.title.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h2>

        <p className="text-brand-gray text-base leading-8 mb-10 max-w-sm">
          {DEAL_CONTENT.description}
        </p>

        <a
          href="#"
          className="inline-flex items-center gap-3 bg-brand-yellow text-brand-black font-bold text-sm tracking-[2px] uppercase px-8 py-4 rounded w-fit hover:bg-brand-yellow-dark transition-colors duration-200 group"
        >
          {DEAL_CONTENT.cta}
          <span className="transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>
    </section>
  );
}
