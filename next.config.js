/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['media.graphassets.com'],
  },
  output: "standalone",
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  }
};

module.exports = nextConfig;
