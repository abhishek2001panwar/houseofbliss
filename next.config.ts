import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization - prioritize modern formats
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 1 week cache
    dangerouslyAllowSVG: true,
    deviceSizes: [320, 420, 640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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

  // Disable Turbopack to use traditional SWC compiler
  // This is a workaround for the 'nul' file issue
};

export default nextConfig;
