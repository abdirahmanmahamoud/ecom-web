import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // next.config.js
  images: {
    domains: [
      "m.media-amazon.com",
      "notjustdev-dummy.s3.us-east-2.amazonaws.com",
    ],
  },
};

export default nextConfig;
