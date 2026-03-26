"use client";

import { useEffect, useRef } from "react";
import TextType from "@/components/ui/text-type";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Pause immediately so we control playback via scroll
    const onLoaded = () => {
      video.pause();
      video.currentTime = 0;
    };

    video.addEventListener("loadedmetadata", onLoaded);
    video.load();

    const onScroll = () => {
      const hero = heroRef.current;
      if (!hero || !video.duration || isNaN(video.duration)) return;

      const rect = hero.getBoundingClientRect();
      const heroHeight = hero.offsetHeight;
      const viewportH = window.innerHeight;

      // scrolled = how far we've scrolled into the sticky zone
      const scrolled = Math.max(0, -rect.top);
      const maxScroll = heroHeight - viewportH;
      const progress = Math.min(1, Math.max(0, scrolled / maxScroll));

      video.currentTime = progress * video.duration;

      // fade hint out quickly
      if (hintRef.current) {
        hintRef.current.style.opacity = progress < 0.05 ? "1" : "0";
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      video.removeEventListener("loadedmetadata", onLoaded);
    };
  }, []);

  return (
    // 600vh gives plenty of scroll distance for video scrubbing
    <div ref={heroRef} className="relative h-[600vh]">
      {/* Sticky viewport */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Video */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
        >
          <source src="/cheezious_hero.mp4" type="video/mp4" />
        </video>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60 pointer-events-none" />

        {/* ── Welcome text — bottom-left — using TextType from Reactbits ── */}
        <div className="absolute bottom-14 left-8 md:left-14 z-10">
          <TextType
            as="h1"
            text={["Welcome to Cheezious!", "Pakistan's Favourite Pizza.", "Order. Enjoy. Repeat."]}
            typingSpeed={60}
            deletingSpeed={35}
            pauseDuration={2500}
            initialDelay={800}
            loop={true}
            showCursor={true}
            cursorCharacter="|"
            className="font-chillax font-bold text-brand-yellow tracking-wider drop-shadow-2xl"
            style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.8rem)" }}
            cursorClassName="text-brand-yellow"
          />
        </div>

        {/* Scroll hint */}
        <div
          ref={hintRef}
          className="absolute bottom-14 right-8 md:right-14 flex flex-col items-center gap-2 transition-opacity duration-500"
        >
          <div className="w-px h-14 bg-gradient-to-b from-brand-yellow/80 to-transparent animate-[scrollDrop_1.6s_ease-in-out_infinite]" />
          <span className="text-[0.6rem] tracking-[3px] uppercase text-white/40 [writing-mode:vertical-lr]">
            Scroll
          </span>
        </div>
      </div>
    </div>
  );
}
