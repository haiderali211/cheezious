import Link from "next/link";

// ─── To add/remove footer columns or links: edit FOOTER_COLS ──────────────────
const FOOTER_COLS = [
  {
    heading: "Menu",
    links: [
      { label: "Pizzas", href: "#menu" },
      { label: "Burgers", href: "#menu" },
      { label: "Sides", href: "#menu" },
      { label: "Drinks", href: "#menu" },
      { label: "Deals", href: "#specials" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Our Story", href: "#about" },
      { label: "Careers", href: "#" },
      { label: "Franchise", href: "#" },
      { label: "Press", href: "#" },
    ],
  },
  {
    heading: "Contact",
    links: [
      { label: "0800-CHEEZ", href: "tel:0800243390" },
      { label: "info@cheezious.com", href: "mailto:info@cheezious.com" },
      { label: "Find Us", href: "#" },
      { label: "Catering", href: "#" },
    ],
  },
];

const SOCIAL_LINKS = [
  { label: "FB", href: "#" },
  { label: "IG", href: "#" },
  { label: "TK", href: "#" },
  { label: "X", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-black border-t border-white/5 pt-12 sm:pt-16 pb-8 px-5 sm:px-8 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-10 sm:mb-14">
          {/* Brand col */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="font-chillax font-bold text-xl sm:text-2xl tracking-[3px] sm:tracking-[4px] text-brand-yellow block mb-4"
            >
              CHEEZIOUS
            </Link>
            <p className="text-sm text-brand-gray leading-7 max-w-xs">
              Pakistan&apos;s legendary pizza chain since 1999. Made fresh,
              baked perfect, served with love — every single time.
            </p>
          </div>

          {FOOTER_COLS.map((col) => (
            <div key={col.heading}>
              <h4 className="text-[0.65rem] tracking-[3px] uppercase text-brand-yellow font-bold mb-4 sm:mb-5">
                {col.heading}
              </h4>
              <ul className="flex flex-col gap-2.5 sm:gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-brand-gray hover:text-brand-white transition-colors duration-200"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-6 sm:pt-7 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-5">
          <p className="text-xs text-brand-gray/50">
            &copy; {new Date().getFullYear()} Cheezious. All rights reserved.
          </p>
          <div className="flex gap-3">
            {SOCIAL_LINKS.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-[0.7rem] font-bold text-brand-gray hover:border-brand-yellow hover:text-brand-yellow hover:bg-brand-yellow/8 transition-all duration-200 touch-manipulation"
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
