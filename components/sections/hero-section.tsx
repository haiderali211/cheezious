"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import TextType from "@/components/ui/text-type";

// ─── Config ───────────────────────────────────────────────────────────────────
const TOTAL_FRAMES = 240;
const FRAMES_DIR = "/frames";

function frameUrl(n: number) {
  return `${FRAMES_DIR}/ezgif-frame-${String(n).padStart(3, "0")}.jpg`;
}

// ─── Scroll-synced copy block ─────────────────────────────────────────────────
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
  const opacity = useTransform(
    scrollYProgress,
    [fadeIn[0], fadeIn[1], fadeOut[0], fadeOut[1]],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [fadeIn[0], fadeIn[1], fadeOut[0], fadeOut[1]],
    [32, 0, 0, -32]
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

// ─── Main Component ───────────────────────────────────────────────────────────
export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // Show content immediately; track load progress in background
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ── Setup canvas with device pixel ratio for crisp rendering ──────────────
  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;
    // Physical pixel dimensions
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    // CSS logical dimensions
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
  }, []);

  // ── Draw frame at physical pixel dimensions ────────────────────────────────
  const drawFrame = useCallback(
    (frameIndex: number, images?: HTMLImageElement[]) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const imgs = images || imagesRef.current;
      const img = imgs[frameIndex];
      if (!img) return;

      // Draw at physical canvas resolution (includes DPR) for crisp output
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      if (!iw || !ih) return;

      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
    },
    []
  );

  // ── Preload frames — show first frame instantly ────────────────────────────
  useEffect(() => {
    setupCanvas();

    let loadedCount = 0;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    imagesRef.current = images;

    // First frame loads immediately for instant display
    const firstImg = new Image();
    firstImg.src = frameUrl(1);
    firstImg.onload = () => {
      images[0] = firstImg;
      drawFrame(0, images);
      setFirstFrameLoaded(true);
    };

    // Remaining frames load in background
    for (let i = 1; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = frameUrl(i + 1);
      img.onload = () => {
        images[i] = img;
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / (TOTAL_FRAMES - 1)) * 100));
        if (loadedCount >= TOTAL_FRAMES - 1) {
          imagesRef.current = images;
          setAllLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount >= TOTAL_FRAMES - 1) {
          imagesRef.current = images;
          setAllLoaded(true);
        }
      };
    }
  }, [setupCanvas, drawFrame]);

  // ── Sync canvas frame to scroll position ──────────────────────────────────
  useEffect(() => {
    if (!firstFrameLoaded) return;

    const unsubscribe = scrollYProgress.on("change", (val) => {
      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(val * (TOTAL_FRAMES - 1)))
      );
      if (frameIndex === currentFrameRef.current) return;
      currentFrameRef.current = frameIndex;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => drawFrame(frameIndex));
    });

    return () => {
      unsubscribe();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [firstFrameLoaded, scrollYProgress, drawFrame]);

  // ── Resize handler ─────────────────────────────────────────────────────────
  useEffect(() => {
    const resize = () => {
      setupCanvas();
      drawFrame(currentFrameRef.current);
    };
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [setupCanvas, drawFrame]);

  // ── Scroll momentum — after wheel stops, glide slightly further ────────────
  // Mirrors the smooth deceleration feel of sites like string-tune.fiddle.digital
  useEffect(() => {
    let lastDelta = 0;
    let timeout: ReturnType<typeof setTimeout>;
    const isTouch = typeof window !== "undefined" && "ontouchstart" in window;
    if (isTouch) return; // Native momentum handles touch; only apply to wheel

    const handleWheel = (e: WheelEvent) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      // Only active while hero viewport is pinned (scrolling through hero)
      if (rect.top > 0 || rect.bottom < window.innerHeight) return;

      lastDelta = e.deltaY;
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        if (Math.abs(lastDelta) > 8) {
          // Gentle 20% additional drift in the same scroll direction
          window.scrollBy({
            top: lastDelta * 0.2,
            behavior: "smooth",
          });
        }
        lastDelta = 0;
      }, 65);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      clearTimeout(timeout);
    };
  }, []);

  // ── Derived motion values ──────────────────────────────────────────────────
  const hintOpacity = useTransform(scrollYProgress, [0, 0.04], [1, 0]);
  const glowOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.2, 0.65, 0.9, 1],
    [0.3, 0.5, 0.8, 0.8, 0.5, 0.3]
  );

  return (
    // 700vh gives generous scroll range for the 5-phase animation
    <div ref={containerRef} className="relative h-[700vh]">

      {/* Sticky viewport — uses dvh for correct mobile height (excludes browser chrome) */}
      <div
        className="sticky top-0 w-full overflow-hidden bg-[#080808]"
        style={{ height: "100dvh" }}
      >
        {/* Frame-by-frame canvas — CSS sized to logical px, pixel buffer at DPR size */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
          style={{ imageRendering: "auto" }}
        />

        {/* Oven-amber radial glow overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-[2]"
          style={{ opacity: glowOpacity }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 55% 55% at 50% 55%, rgba(26,18,2,0.72) 0%, rgba(8,8,8,0) 70%)",
            }}
          />
        </motion.div>

        {/* Film grain texture */}
        <div
          className="absolute inset-0 pointer-events-none z-[3] opacity-[0.18]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "200px 200px",
          }}
        />

        {/* Non-blocking mini progress indicator — bottom-right corner */}
        {!allLoaded && firstFrameLoaded && (
          <div className="absolute bottom-5 right-5 z-[20] flex items-center gap-2.5 opacity-60">
            <div className="w-20 h-px bg-white/10 relative overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-[#FFB800] transition-all duration-300"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            <span className="text-[0.48rem] tracking-[3px] uppercase text-white/40">
              {loadProgress}%
            </span>
          </div>
        )}

        {/* ── COPY BLOCKS ─────────────────────────────────────────────────── */}

        {/* PHASE 1 (0–15%) — Hero entry, centered */}
        <ScrollCopy
          scrollYProgress={scrollYProgress}
          fadeIn={[0.01, 0.06]}
          fadeOut={[0.13, 0.17]}
          className="bottom-16 left-0 right-0 w-full text-center px-5 sm:px-8 z-[10]"
        >
          <p className="text-[0.55rem] sm:text-[0.58rem] tracking-[6px] sm:tracking-[7px] uppercase text-[#FFB800]/70 mb-5 font-bold">
            Cheezious Signature Series
          </p>
          <TextType
            as="h1"
            text={["Crown Crust.", "Perfection in every layer.", "Order Your Crown."]}
            typingSpeed={58}
            deletingSpeed={30}
            pauseDuration={2600}
            initialDelay={400}
            loop={true}
            showCursor={true}
            cursorCharacter="|"
            cursorClassName="text-[#FFB800]"
            className="font-chillax font-bold text-white/92 leading-none tracking-tight block"
            style={{ fontSize: "clamp(2rem, 8vw, 7rem)" }}
          />
          <p className="text-white/28 text-[0.62rem] tracking-[4px] sm:tracking-[5px] mt-5 uppercase">
            Scroll to explore
          </p>
        </ScrollCopy>

        {/* PHASE 2 (15–43%) — Engineered for Cravings, anchored left */}
        <ScrollCopy
          scrollYProgress={scrollYProgress}
          fadeIn={[0.17, 0.24]}
          fadeOut={[0.38, 0.43]}
          className="top-1/2 -translate-y-1/2 left-5 sm:left-8 md:left-14 lg:left-20 w-[calc(50%-1.5rem)] max-w-[280px] z-[10]"
        >
          <div className="w-6 h-px bg-[#FFB800]/50 mb-5" />
          <p className="text-[0.52rem] tracking-[3.5px] uppercase text-[#FFB800] mb-3 font-bold">
            The Foundation
          </p>
          <h2
            className="font-chillax font-bold text-white/90 leading-[0.93] mb-5"
            style={{ fontSize: "clamp(1.1rem, 3vw, 2.6rem)" }}
          >
            Engineered<br />for Cravings.
          </h2>
          <p className="text-white/36 text-[0.72rem] sm:text-[0.8rem] leading-[1.9]">
            24-hour cold-fermented dough.<br />
            Hand-picked mountain herbs.<br />
            Stone-baked at 450°C.
          </p>
        </ScrollCopy>

        {/* PHASE 3 (43–67%) — Liquid Gold, anchored right */}
        <ScrollCopy
          scrollYProgress={scrollYProgress}
          fadeIn={[0.43, 0.50]}
          fadeOut={[0.63, 0.67]}
          className="top-1/2 -translate-y-1/2 right-5 sm:right-8 md:right-14 lg:right-20 w-[calc(50%-1.5rem)] max-w-[280px] text-right z-[10]"
        >
          <div className="w-6 h-px bg-[#E63946]/50 mb-5 ml-auto" />
          <p className="text-[0.52rem] tracking-[3.5px] uppercase text-[#E63946] mb-3 font-bold">
            The Melt
          </p>
          <h2
            className="font-chillax font-bold text-white/90 leading-[0.93] mb-5"
            style={{ fontSize: "clamp(1.1rem, 3vw, 2.6rem)" }}
          >
            Liquid Gold,<br />Redefined.
          </h2>
          <p className="text-white/36 text-[0.72rem] sm:text-[0.8rem] leading-[1.9]">
            Triple-blend mozzarella.<br />
            The signature Cheezious tang.<br />
            Pulled at peak stretch.
          </p>
        </ScrollCopy>

        {/* PHASE 4 (67–87%) — The Crunch, anchored left */}
        <ScrollCopy
          scrollYProgress={scrollYProgress}
          fadeIn={[0.67, 0.74]}
          fadeOut={[0.83, 0.87]}
          className="top-1/2 -translate-y-1/2 left-5 sm:left-8 md:left-14 lg:left-20 w-[calc(50%-1.5rem)] max-w-[280px] z-[10]"
        >
          <div className="w-6 h-px bg-[#FFB800]/50 mb-5" />
          <p className="text-[0.52rem] tracking-[3.5px] uppercase text-[#FFB800] mb-3 font-bold">
            The Crunch
          </p>
          <h2
            className="font-chillax font-bold text-white/90 leading-[0.93] mb-5"
            style={{ fontSize: "clamp(1.1rem, 3vw, 2.6rem)" }}
          >
            Immersive.<br />Crunch-first.<br />Texture.
          </h2>
          <p className="text-white/36 text-[0.72rem] sm:text-[0.8rem] leading-[1.9]">
            High-heat stone bake.<br />
            Aerated hollow crown crust.<br />
            The science of the perfect bite.
          </p>
        </ScrollCopy>

        {/* PHASE 5 (90–100%) — Eat the Future, CTA */}
        <ScrollCopy
          scrollYProgress={scrollYProgress}
          fadeIn={[0.90, 0.95]}
          fadeOut={[0.99, 1.0]}
          className="bottom-14 sm:bottom-16 left-0 right-0 w-full text-center px-5 sm:px-8 z-[10]"
        >
          <p className="text-[0.55rem] sm:text-[0.58rem] tracking-[6px] sm:tracking-[7px] uppercase text-[#FFB800]/70 mb-4 font-bold">
            The Crown Crust
          </p>
          <h2
            className="font-chillax font-bold text-white/92 leading-none tracking-tight mb-3"
            style={{ fontSize: "clamp(2rem, 8vw, 6.5rem)" }}
          >
            Eat the Future.
          </h2>
          <p className="text-white/32 text-[0.65rem] sm:text-[0.7rem] tracking-[3px] sm:tracking-[3.5px] uppercase mb-8 sm:mb-10">
            Crafted for the bold. Melted for you.
          </p>
          <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap pointer-events-auto">
            <a
              href="#cta"
              className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold text-xs sm:text-sm tracking-[2px] uppercase
                         bg-gradient-to-r from-[#FFB800] to-[#E63946]
                         text-[#080808] hover:opacity-90 transition-opacity duration-200
                         shadow-[0_0_50px_rgba(255,184,0,0.28)]"
            >
              Order Your Crown
            </a>
            <a
              href="#menu"
              className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold text-xs sm:text-sm tracking-[2px] uppercase
                         border border-white/14 text-white/48
                         hover:border-white/38 hover:text-white/80 transition-all duration-300"
            >
              View Full Menu
            </a>
          </div>
        </ScrollCopy>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-[10]"
          style={{ opacity: hintOpacity }}
        >
          <div
            className="w-px h-14 scroll-drop"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,184,0,0.8), transparent)",
            }}
          />
          <span className="text-[0.52rem] tracking-[5px] uppercase text-white/22">
            Scroll
          </span>
        </motion.div>

        {/* Bottom fade into page */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none z-[8]" />
      </div>
    </div>
  );
}
