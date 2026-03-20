import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    formats: ["image/webp", "image/avif"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    // Optimize local images
    minimumCacheTTL: 60 * 24, // 1 day
  },

  // Compression and performance
  compress: true,
  poweredByHeader: false,

  // Production optimizations
  productionBrowserSourceMaps: false,

  // Experimental features
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  // Turbopack configuration (Next.js 16 default)
  turbopack: {},
};

export default nextConfig;
