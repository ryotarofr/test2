/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["idwitrlwanewneoypjki.supabase.co"],
  },
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
