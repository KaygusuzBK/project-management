import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sayfa geçişlerini hızlandırmak için optimizasyonlar
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Compiler optimizasyonları
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
