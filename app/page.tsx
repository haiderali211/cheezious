import HeroSection from "@/components/sections/hero-section";
import MarqueeStrip from "@/components/sections/marquee-strip";
import AboutSection from "@/components/sections/about-section";
import MenuSection from "@/components/sections/menu-section";
import SpecialsSection from "@/components/sections/specials-section";
import TestimonialsSection from "@/components/sections/testimonials-section";
import CtaSection from "@/components/sections/cta-section";

/* ─────────────────────────────────────────────────────────────────────────────
   Page composition
   To add a new section:
     1. Create components/sections/your-section.tsx
     2. Import it here
     3. Drop it where you want in the JSX below
   To remove a section: delete its line below (and optionally its file)
───────────────────────────────────────────────────────────────────────────── */

export default function Home() {
  return (
    <>
      {/* 1. Hero — scroll-scrubbed video + TextType */}
      <HeroSection />

      {/* 2. Animated marquee ticker */}
      <MarqueeStrip />

      {/* 3. About / Our Story */}
      <AboutSection />

      {/* 4. Menu — tabbed, Supabase-powered */}
      <MenuSection />

      {/* 5. Weekly specials split */}
      <SpecialsSection />

      {/* 6. Testimonials — Supabase-powered */}
      <TestimonialsSection />

      {/* 7. Call to action */}
      <CtaSection />
    </>
  );
}
