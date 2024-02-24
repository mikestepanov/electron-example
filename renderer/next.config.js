/** @type {import('next').NextConfig} */
module.exports = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  devIndicators: {
    buildActivity: false,
  },
  webpack: (config) => {
    return config
  },
}
