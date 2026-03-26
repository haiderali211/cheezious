import { MenuItem, Testimonial } from "@/lib/supabase";

// ─── Fallback menu items (used until Supabase is wired up) ────────────────────
// To add/remove items: just edit this array or update Supabase rows.
export const FALLBACK_MENU: MenuItem[] = [
  // ── PIZZA ──────────────────────────────────────────────────────────────────
  {
    id: "p1",
    name: "Pepperoni Blast",
    description: "Double pepperoni, mozzarella & our signature tomato base.",
    price: 950,
    image_url:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80",
    category: "pizza",
    is_featured: true,
    is_available: true,
    sort_order: 1,
  },
  {
    id: "p2",
    name: "BBQ Chicken",
    description: "Smoky BBQ base, grilled chicken, caramelised onions & jalapeños.",
    price: 1050,
    image_url:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80",
    category: "pizza",
    is_featured: false,
    is_available: true,
    sort_order: 2,
  },
  {
    id: "p3",
    name: "Veggie Supreme",
    description: "Bell peppers, mushrooms, olives & sun-dried tomatoes.",
    price: 850,
    image_url:
      "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=600&q=80",
    category: "pizza",
    is_featured: false,
    is_available: true,
    sort_order: 3,
  },
  {
    id: "p4",
    name: "Cheezious Special",
    description: "Four-cheese blend on a herb-infused crust. Unforgettable.",
    price: 1150,
    image_url:
      "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=600&q=80",
    category: "pizza",
    is_featured: true,
    is_available: true,
    sort_order: 4,
  },

  // ── SIDES ───────────────────────────────────────────────────────────────────
  {
    id: "s1",
    name: "Garlic Bread",
    description: "Buttery, crispy, with a generous garlic herb spread.",
    price: 250,
    image_url:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&q=80",
    category: "sides",
    is_featured: false,
    is_available: true,
    sort_order: 1,
  },
  {
    id: "s2",
    name: "Cheesy Burger",
    description: "Double patty, cheddar, lettuce & secret Cheezious sauce.",
    price: 450,
    image_url:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80",
    category: "sides",
    is_featured: false,
    is_available: true,
    sort_order: 2,
  },
  {
    id: "s3",
    name: "Crispy Wings",
    description: "6 golden-fried wings with your choice of dip.",
    price: 550,
    image_url:
      "https://images.unsplash.com/photo-1608039755401-742074f0548d?w=600&q=80",
    category: "sides",
    is_featured: false,
    is_available: true,
    sort_order: 3,
  },

  // ── DRINKS ──────────────────────────────────────────────────────────────────
  {
    id: "d1",
    name: "Soft Drinks",
    description: "Pepsi, 7UP, Mirinda — chilled and refreshing.",
    price: 120,
    image_url:
      "https://images.unsplash.com/photo-1437418747212-8d9709afab22?w=600&q=80",
    category: "drinks",
    is_featured: false,
    is_available: true,
    sort_order: 1,
  },
  {
    id: "d2",
    name: "Thick Milkshake",
    description: "Chocolate, strawberry or vanilla — impossibly thick.",
    price: 350,
    image_url:
      "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&q=80",
    category: "drinks",
    is_featured: false,
    is_available: true,
    sort_order: 2,
  },
];

// ─── Fallback testimonials ─────────────────────────────────────────────────────
export const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Ahmed Raza",
    title: "Food Blogger · Lahore",
    avatar_url:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    body: "Best pizza in Lahore, hands down. The Cheezious Special is out of this world — I order it at least twice a week!",
    rating: 5,
  },
  {
    id: "t2",
    name: "Sara Khan",
    title: "Foodie · Karachi",
    avatar_url:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&q=80",
    body: "The BBQ Chicken pizza is absolutely fire. Crispy crust, smoky sauce, and just the right amount of cheese.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Bilal Malik",
    title: "Regular Customer · Islamabad",
    avatar_url:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    body: "Family nights aren't complete without Cheezious. Fast delivery, piping hot, and the kids love every single bite.",
    rating: 5,
  },
];
