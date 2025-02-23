/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Optimize SVG loading
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Image domains for external images (e.g., project screenshots)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rohitc.tech",
      },
    ],
    // Image optimization settings
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    formats: ["image/webp"],
  },
  // Enable React strict mode for better development
  reactStrictMode: true,
  // Improve production performance
  swcMinify: true,
  // Optimize page loading
  poweredByHeader: false,
};

module.exports = nextConfig;
