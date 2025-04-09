/** @type {import('next').NextConfig} */
const fs = require('fs');
const path = require('path');

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "13.60.216.198",
      },
    ],
  },
  output: 'standalone',
  trailingSlash: true,  
  reactStrictMode: true,

  webpack: (config, { isServer }) => {
    if (!isServer) {
      const redirectsPath = path.join(__dirname, 'public', '_redirects');
      const outputPath = path.join(__dirname, '.next', 'public', '_redirects');
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      fs.copyFileSync(redirectsPath, outputPath);
    }
    return config;
  },
};

module.exports = nextConfig;
