# 🍕 Cheezious — Next.js Landing Page

Pakistan's legendary pizza restaurant — built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **GSAP**, and **Supabase**.

---

## Project Structure

```
cheezious/
├── app/
│   ├── globals.css          # Chillax font + base styles
│   ├── layout.tsx           # Root layout (Navbar + Footer wrapping)
│   └── page.tsx             # Page composition — add/remove sections here
│
├── components/
│   ├── ui/
│   │   └── text-type.tsx    # TextType component (Reactbits) — hero typing animation
│   ├── layout/
│   │   ├── navbar.tsx       # Responsive navbar — edit NAV_LINKS array to add/remove links
│   │   └── footer.tsx       # Footer — edit FOOTER_COLS to add/remove columns/links
│   └── sections/            # ← Each section is its own file (easy to add/remove)
│       ├── hero-section.tsx        # Scroll-scrubbed video + TextType
│       ├── marquee-strip.tsx       # Yellow ticker — edit ITEMS array
│       ├── about-section.tsx       # Our story + stats
│       ├── menu-section.tsx        # Tabbed menu — Supabase powered
│       ├── specials-section.tsx    # Weekly deal split
│       ├── testimonials-section.tsx # Reviews — Supabase powered
│       └── cta-section.tsx         # Order now CTA
│
├── data/
│   └── fallback.ts          # Static fallback data (used before Supabase is set up)
│
├── lib/
│   ├── supabase.ts          # Supabase client + types
│   └── utils.ts             # cn() helper
│
├── types/
│   └── index.ts             # Shared types + MENU_CATEGORIES config
│
├── public/
│   └── cheezious_hero.mp4   # ← PUT YOUR VIDEO HERE
│
├── supabase-schema.sql      # Run this in Supabase SQL Editor
└── .env.local.example       # Copy to .env.local and fill in your keys
```

---

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Add the hero video

Copy `cheezious_hero.mp4` into the `public/` folder:

```bash
cp /path/to/cheezious_hero.mp4 public/
```

### 3. Configure environment variables

```bash
cp .env.local.example .env.local
```

Fill in your Supabase credentials (get them from [supabase.com](https://supabase.com) → Project → Settings → API):

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

> **Note:** The app works without Supabase — it falls back to static data in `data/fallback.ts`.

### 4. Set up Supabase (optional but recommended)

In the Supabase SQL Editor, run the contents of `supabase-schema.sql`. This creates:
- `menu_items` table
- `testimonials` table
- Row Level Security policies (public read)

### 5. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## How to Make Changes

### Add a nav link
Edit `NAV_LINKS` in `components/layout/navbar.tsx`.

### Add a menu item
**Option A (Supabase):** Insert a row into the `menu_items` table.  
**Option B (static):** Add an object to `FALLBACK_MENU` in `data/fallback.ts`.

### Add a menu category
1. Add to `MENU_CATEGORIES` in `types/index.ts`
2. Add items with that category key to Supabase or `data/fallback.ts`

### Add a section
1. Create `components/sections/your-section.tsx`
2. Import and add it in `app/page.tsx`

### Remove a section
Delete its line from `app/page.tsx`.

### Update the weekly special
Edit `DEAL_CONTENT` in `components/sections/specials-section.tsx`.

---

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard:
# NEXT_PUBLIC_SUPABASE_URL
# NEXT_PUBLIC_SUPABASE_ANON_KEY
```

Or connect your GitHub repo in the [Vercel dashboard](https://vercel.com) for automatic deployments on every push.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| Next.js 14 | Framework (App Router) |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Framer Motion | Scroll animations, transitions |
| GSAP | TextType cursor blink |
| Supabase | Menu & testimonials database |
| Vercel | Hosting & deployment |

---

## Font

**Chillax** — loaded from [Fontshare](https://www.fontshare.com/fonts/chillax) via CSS `@import` in `globals.css`.
