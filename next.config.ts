import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [{ source: "/.well-known/mcp.json", destination: "/api/well-known/mcp" }];
  },
};

export default nextConfig;
