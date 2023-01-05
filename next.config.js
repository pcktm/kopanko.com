/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['media.graphassets.com'],
  },
  output: "standalone",
  i18n: {
    locales: ['en', 'pl'],
    defaultLocale: 'en',
  }
};

module.exports = nextConfig;
