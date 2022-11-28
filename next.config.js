/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["links.papareact.com",'picsum.photos'],
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
