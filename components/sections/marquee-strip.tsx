// ─── To add/remove marquee items: edit ITEMS array ──────────────────────────
const ITEMS = [
  "Legendary Pizza",
  "Fresh Ingredients",
  "Baked to Perfection",
  "Est. 1999",
  "Cheezious",
  "Order Now",
  "80+ Locations",
  "2M+ Happy Guests",
];

export default function MarqueeStrip() {
  // Duplicate for seamless infinite loop
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div className="w-full overflow-hidden bg-brand-yellow py-4 border-y border-black/10">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-chillax font-bold text-brand-black text-base tracking-[3px] uppercase flex items-center gap-4 px-10"
          >
            {item}
            <span className="w-1.5 h-1.5 rounded-full bg-brand-black inline-block" />
          </span>
        ))}
      </div>
    </div>
  );
}
