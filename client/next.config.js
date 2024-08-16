/** @type {import('next').NextConfig} */
const prod = process.env.NODE_ENV === 'production';
module.exports = {
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
};
