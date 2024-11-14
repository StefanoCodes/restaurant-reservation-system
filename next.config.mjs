/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "utfs.io" },
      { hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
