/** @type {import('next').NextConfig} */
const fs = require('fs');
const path = require('path');

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http", // Change to https to avoid mixed content issues
        hostname: "13.60.216.198",
      },
    ],
  },
  output: 'standalone',  // Ensures compatibility with Netlify (Serverless)
  trailingSlash: true,   // Helps with route handling and avoids 404 errors
  reactStrictMode: true, // Helps with development (strict checks)

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
