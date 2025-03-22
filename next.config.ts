import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://plateforme-collaborative-backend-git-main-liberts-projects.vercel.app/api/:path*",
      },
    ];
  },
  // ...existing code...
};

export default nextConfig;
