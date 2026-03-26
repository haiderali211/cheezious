"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import TextType from "@/components/ui/text-type";

// ─── Scroll phase helpers ──────────────────────────────────────────────────────
function useScrollRange(
  scrollYProgress: MotionValue<number>,
  input: number[],
  output: number[]
) {
  return useTransform(scrollYProgress, input, output);
}

// ─── Individual floating ingredient layer ─────────────────────────────────────
function IngredientLayer({
  src,
  alt,
  scrollYProgress,
  explodeStart,
  explodeEnd,
  assembleStart,
  assembleEnd,
  translateY,
  translateX,
  rotate,
  scale,
  zIndex,
}: {
  src: string;
  alt: string;
  scrollYProgress: MotionValue<number>;
  explodeStart: number;
  explodeEnd: number;
  assembleStart: number;
  assembleEnd: number;
  translateY: number;
  translateX: number;
  rotate: number;
  scale: number;
  zIndex: number;
}) {
  const ty = useScrollRange(
    scrollYProgress,
    [explodeStart, explodeEnd, assembleStart, assembleEnd],
    [0, translateY, translateY, 0]
  );
  const tx = useScrollRange(
    scrollYProgress,
    [explodeStart, explodeEnd, assembleStart, assembleEnd],
    [0, translateX, translateX, 0]
  );
  const rot = useScrollRange(
    scrollYProgress,
    [explodeStart, explodeEnd, assembleStart, assembleEnd],
    [0, rotate, rotate, 0]
  );
  const sc = useScrollRange(
    scrollYProgress,
    [explodeStart, explodeEnd, assembleStart, assembleEnd],
    [1, scale, scale, 1]
  );
  const opacity = useScrollRange(
    scrollYProgress,
    [0.04, 0.08, explodeStart, explodeEnd, assembleStart, assembleEnd, 0.97, 1],
    [0, 1, 1, 1, 1, 1, 1, 0]
  );

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{ y: ty, x: tx, rotate: rot, scale: sc, opacity, zIndex }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain"
        style={{ filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.95))" }}
      />
    </motion.div>
  );
}

// ─── Copy block that fades in/out at a scroll range ───────────────────────────
function ScrollCopy({
  scrollYProgress,
  fadeIn,
  fadeOut,
  children,
  className = "",
}: {
  scrollYProgress: MotionValue<number>;
  fadeIn: [number, number];
  fadeOut: [number, number];
  children: React.ReactNode;
  className?: string;
}) {
  const opacity = useScrollRange(
    scrollYProgress,
    [fadeIn[0], fadeIn[1], fadeOut[0], fadeOut[1]],
    [0, 1, 1, 0]
  );
  const y = useScrollRange(
    scrollYProgress,
    [fadeIn[0], fadeIn[1], fadeOut[0], fadeOut[1]],
    [36, 0, 0, -36]
  );

  return (
    <motion.div
      className={`absolute pointer-events-none select-none ${className}`}
      style={{ opacity, y }}
    >
      {children}
    </motion.div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const navOpacity = useScrollRange(scrollYProgress, [0, 0.05], [0, 1]);
  const basePizzaOpacity = useScrollRange(
    scrollYProgress,
    [0, 0.06, 0.92, 1],
    [0, 1, 1, 0]
  );
  const glowOpacity = useScrollRange(
    scrollYProgress,
    [0, 0.1, 0.86, 1],
    [0, 0.7, 0.7, 0]
  );
  const glowScale = useScrollRange(scrollYProgress, [0.15, 0.65], [1, 1.5]);
  const hintOpacity = useScrollRange(scrollYProgress, [0, 0.05], [1, 0]);

  return (
    <>
      {/* ── FIXED NAV ──────────────────────────────────────────────────────── */}
      <motion.nav
        style={{ opacity: navOpacity }}
        className="fixed top-0 left-0 right-0 z-[950] flex items-center justify-between
                   px-8 md:px-14 py-4
                   bg-[rgba(8,8,8,0.78)] backdrop-blur-2xl
                   border-b border-white/[0.04]"
      >
        <span className="font-chillax font-bold text-base tracking-[4px] text-white/90">
          THE CROWN CRUST
        </span>

        <ul className="hidden md:flex items-center gap-8 list-none">
          {["The Craft", "Ingredients", "Flavor Profile", "Menu"].map((l) => (
            <li key={l}>
              <a
                href="#"
                className="text-[0.68rem] tracking-[2px] uppercase text-white/40
                           hover:text-white/80 transition-colors duration-300"
              >
                {l}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#"
          className="hidden md:inline-flex items-center px-5 py-2 rounded-full
                     text-[0.68rem] font-bold tracking-[2px] uppercase
                     border border-[#FFB800]/50 text-[#FFB800]
                     hover:bg-[#FFB800]/10 transition-all duration-300"
        >
          Taste the Revolution
        </a>
      </motion.nav>

      {/* ── SCROLL CONTAINER — 600vh ───────────────────────────────────────── */}
      <div ref={containerRef} className="relative h-[600vh] bg-[#080808]">

        {/* ── STICKY CANVAS ─────────────────────────────────────────────────── */}
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#080808]">

          {/* Oven-amber radial glow */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
            style={{ opacity: glowOpacity, scale: glowScale }}
          >
            <div
              className="w-[720px] h-[720px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(26,18,2,0.9) 0%, rgba(15,11,1,0.6) 40%, transparent 72%)",
              }}
            />
          </motion.div>

          {/* ── PIZZA LAYERS ──────────────────────────────────────────────── */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="relative w-[480px] h-[480px] md:w-[640px] md:h-[640px]">

              {/* BASE PIZZA — hero shot */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                style={{ opacity: basePizzaOpacity, zIndex: 10 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=1000&q=95"
                  alt="Crown Crust Pizza"
                  className="w-full h-full object-contain"
                  style={{
                    filter:
                      "drop-shadow(0 0 80px rgba(255,184,0,0.15)) drop-shadow(0 80px 160px rgba(0,0,0,0.98))",
                  }}
                />
              </motion.div>

              {/* LAYER 1 — Cheese/mozzarella lifts up-left */}
              <IngredientLayer
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=700&q=90"
                alt="Mozzarella layer"
                scrollYProgress={scrollYProgress}
                explodeStart={0.15} explodeEnd={0.32}
                assembleStart={0.83} assembleEnd={0.95}
                translateY={-190} translateX={-40}
                rotate={-14} scale={0.78}
                zIndex={20}
              />

              {/* LAYER 2 — Pepperoni drifts right */}
              <IngredientLayer
                src="https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=700&q=90"
                alt="Pepperoni"
                scrollYProgress={scrollYProgress}
                explodeStart={0.18} explodeEnd={0.36}
                assembleStart={0.83} assembleEnd={0.95}
                translateY={-70} translateX={240}
                rotate={20} scale={0.68}
                zIndex={22}
              />

              {/* LAYER 3 — Sauce/cheese pull drifts left-down */}
              <IngredientLayer
                src="https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=700&q=90"
                alt="Cheese pull"
                scrollYProgress={scrollYProgress}
                explodeStart={0.40} explodeEnd={0.57}
                assembleStart={0.83} assembleEnd={0.95}
                translateY={140} translateX={-220}
                rotate={-10} scale={0.72}
                zIndex={21}
              />

              {/* LAYER 4 — Crust reveals down-right */}
              <IngredientLayer
                src="https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=700&q=90"
                alt="Crust cross-section"
                scrollYProgress={scrollYProgress}
                explodeStart={0.62} explodeEnd={0.77}
                assembleStart={0.83} assembleEnd={0.95}
                translateY={210} translateX={80}
                rotate={8} scale={0.74}
                zIndex={19}
              />
            </div>
          </div>

          {/* ── COPY BLOCKS ─────────────────────────────────────────────────── */}

          {/* 0–15% — Hero intro */}
          <ScrollCopy
            scrollYProgress={scrollYProgress}
            fadeIn={[0.01, 0.07]}
            fadeOut={[0.13, 0.17]}
            className="bottom-20 left-1/2 -translate-x-1/2 w-full text-center px-6 z-30"
          >
            <p className="text-[0.6rem] tracking-[6px] uppercase text-[#FFB800]/80 mb-5 font-bold">
              Cheezious Signature Series
            </p>
            <TextType
              as="h1"
              text={["Crown Crust", "Perfection in every layer.", "Order Your Crown."]}
              typingSpeed={60}
              deletingSpeed={32}
              pauseDuration={2800}
              initialDelay={500}
              loop={true}
              showCursor={true}
              cursorCharacter="|"
              cursorClassName="text-[#FFB800]"
              className="font-chillax font-bold text-white/92 leading-none tracking-tight block"
              style={{ fontSize: "clamp(3rem, 8.5vw, 7.5rem)" }}
            />
            <p className="text-white/30 text-xs tracking-[4px] mt-5 uppercase">
              Scroll to explore
            </p>
          </ScrollCopy>

          {/* 15–40% — Engineered for Cravings (left) */}
          <ScrollCopy
            scrollYProgress={scrollYProgress}
            fadeIn={[0.19, 0.27]}
            fadeOut={[0.38, 0.43]}
            className="top-1/2 -translate-y-1/2 left-8 md:left-14 lg:left-20 max-w-[280px] z-30"
          >
            <div className="w-8 h-px bg-[#FFB800]/60 mb-5" />
            <p className="text-[0.58rem] tracking-[4px] uppercase text-[#FFB800] mb-3 font-bold">
              The Foundation
            </p>
            <h2
              className="font-chillax font-bold text-white/88 leading-[0.95] mb-5"
              style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)" }}
            >
              Engineered<br />for Cravings.
            </h2>
            <p className="text-white/38 text-[0.82rem] leading-[1.8]">
              24-hour cold-fermented dough.<br />
              Hand-picked mountain herbs.<br />
              Stone-baked at 450°C.
            </p>
          </ScrollCopy>

          {/* 40–65% — Liquid Gold (right) */}
          <ScrollCopy
            scrollYProgress={scrollYProgress}
            fadeIn={[0.43, 0.51]}
            fadeOut={[0.63, 0.68]}
            className="top-1/2 -translate-y-1/2 right-8 md:right-14 lg:right-20 max-w-[280px] text-right z-30"
          >
            <div className="w-8 h-px bg-[#E63946]/60 mb-5 ml-auto" />
            <p className="text-[0.58rem] tracking-[4px] uppercase text-[#E63946] mb-3 font-bold">
              The Melt
            </p>
            <h2
              className="font-chillax font-bold text-white/88 leading-[0.95] mb-5"
              style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)" }}
            >
              Liquid Gold,<br />Redefined.
            </h2>
            <p className="text-white/38 text-[0.82rem] leading-[1.8]">
              Triple-blend mozzarella.<br />
              The signature Cheezious tang.<br />
              Pulled at peak stretch.
            </p>
          </ScrollCopy>

          {/* 65–85% — Crunch (left) */}
          <ScrollCopy
            scrollYProgress={scrollYProgress}
            fadeIn={[0.68, 0.75]}
            fadeOut={[0.82, 0.87]}
            className="top-1/2 -translate-y-1/2 left-8 md:left-14 lg:left-20 max-w-[280px] z-30"
          >
            <div className="w-8 h-px bg-[#FFB800]/60 mb-5" />
            <p className="text-[0.58rem] tracking-[4px] uppercase text-[#FFB800] mb-3 font-bold">
              The Crunch
            </p>
            <h2
              className="font-chillax font-bold text-white/88 leading-[0.95] mb-5"
              style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)" }}
            >
              Immersive.<br />Crunch-first.<br />Texture.
            </h2>
            <p className="text-white/38 text-[0.82rem] leading-[1.8]">
              High-heat stone bake.<br />
              Aerated hollow crown crust.<br />
              The science of the perfect bite.
            </p>
          </ScrollCopy>

          {/* 85–100% — Reassemble CTA */}
          <ScrollCopy
            scrollYProgress={scrollYProgress}
            fadeIn={[0.91, 0.96]}
            fadeOut={[0.99, 1.0]}
            className="bottom-20 left-1/2 -translate-x-1/2 w-full text-center px-6 z-30"
          >
            <p className="text-[0.6rem] tracking-[6px] uppercase text-[#FFB800]/80 mb-4 font-bold">
              The Crown Crust
            </p>
            <h2
              className="font-chillax font-bold text-white/92 leading-none tracking-tight mb-3"
              style={{ fontSize: "clamp(2.8rem, 8vw, 7rem)" }}
            >
              Eat the Future.
            </h2>
            <p className="text-white/35 text-xs tracking-[3px] uppercase mb-10">
              Crafted for the bold. Melted for you.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap pointer-events-auto">
              <a
                href="#"
                className="px-8 py-3.5 rounded-full font-bold text-sm tracking-[2px] uppercase
                           bg-gradient-to-r from-[#FFB800] to-[#E63946]
                           text-[#080808] hover:opacity-88 transition-opacity duration-200
                           shadow-[0_0_40px_rgba(255,184,0,0.3)]"
              >
                Order Your Crown
              </a>
              <a
                href="#menu"
                className="px-8 py-3.5 rounded-full font-bold text-sm tracking-[2px] uppercase
                           border border-white/15 text-white/50
                           hover:border-white/40 hover:text-white/80 transition-all duration-300"
              >
                View Full Menu
              </a>
            </div>
          </ScrollCopy>

          {/* ── SCROLL HINT ────────────────────────────────────────────────── */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-30"
            style={{ opacity: hintOpacity }}
          >
            <div
              className="w-px h-14 scroll-drop"
              style={{
                background: "linear-gradient(to bottom, rgba(255,184,0,0.8), transparent)",
              }}
            />
            <span className="text-[0.55rem] tracking-[5px] uppercase text-white/25">
              Scroll
            </span>
          </motion.div>

          {/* ── FILM GRAIN OVERLAY ─────────────────────────────────────────── */}
          <div
            className="absolute inset-0 pointer-events-none z-20 opacity-[0.22]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
              backgroundSize: "200px 200px",
            }}
          />

          {/* Bottom fade into rest of page */}
          <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none z-[25]" />
        </div>
      </div>
    </>
  );
}
