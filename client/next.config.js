/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false, //브라우저로 확인이 필요할때 true로 재설정 하기
});

const prod = process.env.NODE_ENV === 'production';

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  // serverRuntimeConfig: {
  //   // Only available on the server side
  //   apiURL: prod ? process.env.SERVER_SIDE_API_URL : process.env.DEV_URL,
  // },
  // publicRuntimeConfig: {
  //   // Available on both server and client
  //   apiURL: prod ? process.env.CLIENT_SIDE_API_URL : process.env.DEV_URL,
  // },

  env: {
    // SERVER_SIDE_API_URL: process.env.SERVER_SIDE_API_URL,
    // CLIENT_SIDE_API_URL: process.env.CLIENT_SIDE_API_URL,
    NEXT_PUBLIC_BASE_URL: prod ? process.env.NEXT_PUBLIC_PROD_URL : process.env.DEV_URL,
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
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
