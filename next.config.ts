import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { isServer }) => {
    // Only include node-fetch and gaxios on the server-side
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        "node-fetch": false,
        "gaxios": false,
        "http": false,
        "https": false,
        "querystring": false,
        "url": false,
        "stream": false,
        "buffer": false
      };
    }
    return config;
  }
};

export default nextConfig;
