-- ─────────────────────────────────────────────────────────────────
-- Cheezious — Supabase Schema
-- Run this in your Supabase SQL Editor to create all tables.
-- After running, enable Row Level Security and add policies as needed.
-- ─────────────────────────────────────────────────────────────────

-- Menu items table
-- To add a menu item: INSERT INTO menu_items (name, description, price, image_url, category, sort_order) VALUES (...)
-- To remove:          DELETE FROM menu_items WHERE id = '...'
-- To toggle available: UPDATE menu_items SET is_available = false WHERE id = '...'
CREATE TABLE IF NOT EXISTS menu_items (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name          text NOT NULL,
  description   text,
  price         numeric(10, 2) NOT NULL,
  image_url     text,
  category      text NOT NULL CHECK (category IN ('pizza', 'sides', 'drinks', 'deals')),
  is_featured   boolean NOT NULL DEFAULT false,
  is_available  boolean NOT NULL DEFAULT true,
  sort_order    integer NOT NULL DEFAULT 0,
  created_at    timestamptz DEFAULT now()
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  title       text,
  avatar_url  text,
  body        text NOT NULL,
  rating      integer CHECK (rating BETWEEN 1 AND 5) DEFAULT 5,
  is_active   boolean NOT NULL DEFAULT true,
  created_at  timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE menu_items   ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Public read access (anonymous users can read)
CREATE POLICY "Public read menu_items"   ON menu_items   FOR SELECT USING (true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (true);
