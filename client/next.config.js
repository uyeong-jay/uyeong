/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  // openAnalyzer: false,
});

const prod = process.env.NODE_ENV === 'production';

module.exports = withBundleAnalyzer({
  reactStrictMode: true,

  env: {
    BASE_URL: prod ? process.env.PROD_URL : process.env.DEV_URL,
    CLOUDINARY_UPLOAD_PRESET: process.env.CLOUDINARY_UPLOAD_PRESET,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    CLOUDINARY_UPLOAD_API: process.env.CLOUDINARY_UPLOAD_API,
    CLOUDINARY_DELETE_API: process.env.CLOUDINARY_DELETE_API,
    EMAILJS_SERVICE_ID: process.env.EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID,
    EMAILJS_PUBLIC_KEY: process.env.EMAILJS_PUBLIC_KEY,
  },

  images: {
    domains: ['res.cloudinary.com', 'img.shields.io'],
  },
  experimental: {
    scrollRestoration: true,
  },
  output: 'standalone',

  webpack(config) {
    return {
      ...config,
      mode: prod ? 'production' : 'development',
      devtool: prod ? 'hidden-source-map' : 'eval-source-map',
    };
  },
});
