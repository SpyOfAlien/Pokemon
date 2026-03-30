import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      new URL("https://raw.githubusercontent.com/PokeAPI/sprites/**"),
    ],
  },
};

export default nextConfig;
