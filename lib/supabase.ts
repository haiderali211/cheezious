import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// If env vars are missing the app still works — all data sections
// fall back to the static data in data/fallback.ts automatically.
export const supabaseConfigured =
  supabaseUrl.length > 0 && supabaseAnonKey.length > 0;

export const supabase = supabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// ─── Types matching your Supabase tables ──────────────────
export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: "pizza" | "sides" | "drinks" | "deals";
  is_featured: boolean;
  is_available: boolean;
  sort_order: number;
};

export type NavLink = {
  id: string;
  label: string;
  href: string;
  sort_order: number;
};

export type Testimonial = {
  id: string;
  name: string;
  title: string;
  avatar_url: string;
  body: string;
  rating: number;
};
