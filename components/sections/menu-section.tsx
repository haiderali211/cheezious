"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";
import { supabase, supabaseConfigured, type MenuItem } from "@/lib/supabase";
import { FALLBACK_MENU } from "@/data/fallback";
import { MENU_CATEGORIES } from "@/types";

/* ─────────────────────────────────────────────────────────────────────────────
   MenuSection
   • Fetches items from Supabase `menu_items` table.
   • Falls back to static data if Supabase is not yet configured.
   • To add a category: add to MENU_CATEGORIES in types/index.ts
   • To add a menu item: insert into Supabase OR add to data/fallback.ts
───────────────────────────────────────────────────────────────────────────── */

function MenuCard({ item, delay }: { item: MenuItem; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
      }}
      className="group bg-brand-black-mid border border-white/5 rounded-2xl overflow-hidden hover:-translate-y-2 hover:border-brand-yellow/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all duration-350"
    >
      {/* Image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <Image
          src={item.image_url}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {item.is_featured && (
          <span className="absolute top-3 left-3 bg-brand-yellow text-brand-black text-[0.6rem] font-bold tracking-[2px] uppercase px-2.5 py-1 rounded">
            Featured
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-5 pb-6">
        <h3 className="font-chillax font-bold text-xl tracking-wide text-brand-white mb-1.5">
          {item.name}
        </h3>
        <p className="text-sm text-brand-gray leading-6 mb-5">
          {item.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-chillax font-bold text-2xl text-brand-yellow">
            Rs {item.price.toLocaleString()}
          </span>
          <button className="border border-brand-yellow/40 text-brand-yellow text-[0.7rem] font-bold tracking-[1.5px] uppercase px-4 py-1.5 rounded hover:bg-brand-yellow hover:text-brand-black transition-all duration-200">
            Add +
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MenuSection() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<MenuItem["category"]>("pizza");
  const [loading, setLoading] = useState(true);

  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  useEffect(() => {
    async function fetchMenu() {
      if (!supabaseConfigured || !supabase) {
        setItems(FALLBACK_MENU);
        setLoading(false);
        return;
      }
      try {
        const { data, error } = await supabase
          .from("menu_items")
          .select("*")
          .eq("is_available", true)
          .order("sort_order", { ascending: true });

        if (error || !data || data.length === 0) {
          setItems(FALLBACK_MENU);
        } else {
          setItems(data as MenuItem[]);
        }
      } catch {
        // Supabase not configured yet — use fallback
        setItems(FALLBACK_MENU);
      } finally {
        setLoading(false);
      }
    }
    fetchMenu();
  }, []);

  const filtered = items.filter((i) => i.category === activeCategory);

  return (
    <section id="menu" className="py-24 px-8 md:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div
        ref={headerRef}
        className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14"
        style={{
          opacity: headerInView ? 1 : 0,
          transform: headerInView ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <div>
          <p className="text-[0.65rem] tracking-[4px] uppercase text-brand-yellow font-bold mb-3">
            What We Serve
          </p>
          <h2
            className="font-chillax font-bold text-brand-white leading-none tracking-wide"
            style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }}
          >
            Our <span className="text-brand-yellow">Menu</span>
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-brand-black-mid p-1 rounded-lg border border-white/5">
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-5 py-2 rounded-md text-[0.72rem] font-bold tracking-[1px] uppercase transition-all duration-200 ${
                activeCategory === cat.key
                  ? "bg-brand-yellow text-brand-black"
                  : "text-brand-gray hover:text-brand-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        // Skeleton
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-brand-black-mid rounded-2xl aspect-[3/4] animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.length > 0 ? (
            filtered.map((item, idx) => (
              <MenuCard key={item.id} item={item} delay={idx * 0.07} />
            ))
          ) : (
            <p className="col-span-4 text-center text-brand-gray py-16">
              No items in this category yet.
            </p>
          )}
        </div>
      )}
    </section>
  );
}
