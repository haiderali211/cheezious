"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";
import { supabase, supabaseConfigured, type Testimonial } from "@/lib/supabase";
import { FALLBACK_TESTIMONIALS } from "@/data/fallback";

/* ─────────────────────────────────────────────────────────────────────────────
   TestimonialsSection
   • Fetches from Supabase `testimonials` table (is_active = true)
   • Falls back to static data if Supabase is not configured
   • To add a review: insert a row into Supabase OR add to data/fallback.ts
───────────────────────────────────────────────────────────────────────────── */

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={i < rating ? "text-brand-yellow" : "text-white/15"}
          style={{ fontSize: "0.9rem" }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function TestimonialCard({
  item,
  delay,
}: {
  item: Testimonial;
  delay: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
      className="relative bg-brand-black-mid border border-white/5 rounded-2xl p-7 hover:border-brand-yellow/25 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      {/* Giant quote mark */}
      <span className="absolute -top-5 right-5 font-chillax text-[8rem] text-brand-yellow/5 leading-none pointer-events-none select-none">
        "
      </span>

      <StarRating rating={item.rating} />

      <p className="text-sm text-brand-white/65 leading-7 mb-6 relative z-10">
        &ldquo;{item.body}&rdquo;
      </p>

      <div className="flex items-center gap-3">
        <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-brand-yellow/30 flex-shrink-0">
          <Image
            src={item.avatar_url}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-bold text-sm text-brand-white">{item.name}</p>
          <p className="text-[0.7rem] text-brand-gray tracking-wide mt-0.5">
            {item.title}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  useEffect(() => {
    async function fetchTestimonials() {
      if (!supabaseConfigured || !supabase) {
        setTestimonials(FALLBACK_TESTIMONIALS);
        return;
      }
      try {
        const { data, error } = await supabase
          .from("testimonials")
          .select("*")
          .eq("is_active", true)
          .order("created_at", { ascending: false });

        if (error || !data || data.length === 0) {
          setTestimonials(FALLBACK_TESTIMONIALS);
        } else {
          setTestimonials(data as Testimonial[]);
        }
      } catch {
        setTestimonials(FALLBACK_TESTIMONIALS);
      }
    }
    fetchTestimonials();
  }, []);

  return (
    <section
      id="testimonials"
      className="py-28 px-8 md:px-12 max-w-7xl mx-auto"
    >
      {/* Header */}
      <div
        ref={headerRef}
        className="mb-14"
        style={{
          opacity: headerInView ? 1 : 0,
          transform: headerInView ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <p className="text-[0.65rem] tracking-[4px] uppercase text-brand-yellow font-bold mb-3">
          What People Say
        </p>
        <h2
          className="font-chillax font-bold text-brand-white leading-none tracking-wide"
          style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }}
        >
          Real <span className="text-brand-yellow">Reviews</span>
        </h2>
      </div>

      {/* Grid — responsive: 1 col mobile, 2 tablet, 3 desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {testimonials.map((t, idx) => (
          <TestimonialCard key={t.id} item={t} delay={idx * 0.1} />
        ))}
      </div>
    </section>
  );
}
