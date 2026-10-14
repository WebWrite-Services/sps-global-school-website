import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "blog.webwrite.co.in"
      },
      {
        protocol: "https",
        hostname: "*.supabase.co"
      },
      {
        protocol: "https",
        hostname: "*.supabase.in"
      }
    ]
  },
};

export default nextConfig;
