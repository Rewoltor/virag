import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },
  async rewrites() {
    return [{ source: "/.well-known/mcp.json", destination: "/api/well-known/mcp" }];
  },
};

export default nextConfig;
