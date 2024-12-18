import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d12man5gwydfvl.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "img-global.cpcdn.com",
      },
      {
        protocol: "https",
        hostname: "awsimages.detik.net.id",
      },
    ],
  },
};

export default nextConfig;
