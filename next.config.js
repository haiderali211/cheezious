/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**.supabase.co" },
    ],
  },
  // Increase static asset limit for 240 frames
  experimental: {
    largePageDataBytes: 128 * 1024 * 1024,
  },
};

module.exports = nextConfig;
