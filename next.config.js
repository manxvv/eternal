/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    
    // local images in /public are always allowed
  },
};

module.exports = nextConfig;
