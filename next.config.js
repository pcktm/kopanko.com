/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['media.graphassets.com'],
  },
  experimental: {
    images: {
      layoutRaw: true,
    },
    outputStandalone: true,
  },
};

module.exports = nextConfig;
