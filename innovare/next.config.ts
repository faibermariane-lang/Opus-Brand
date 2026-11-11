import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // O repositório tem outro projeto na raiz; fixa a raiz deste app.
  turbopack: { root: path.join(__dirname) },
  outputFileTracingRoot: path.join(__dirname),
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [375, 640, 768, 1024, 1280, 1536, 1920],
  },
  poweredByHeader: false,
};

export default nextConfig;
