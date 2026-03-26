export type { MenuItem, NavLink, Testimonial } from "@/lib/supabase";

export interface MenuCategory {
  key: "pizza" | "sides" | "drinks" | "deals";
  label: string;
}

export const MENU_CATEGORIES: MenuCategory[] = [
  { key: "pizza", label: "Pizza" },
  { key: "sides", label: "Sides" },
  { key: "drinks", label: "Drinks" },
  { key: "deals", label: "Deals" },
];
