/** @type {import('next').NextConfig} */
const prod = process.env.NODE_ENV === 'production';
module.exports = {
  reactStrictMode: true,

  env: {
    BASE_URL: prod ? '' : process.env.BASE_URL,
    FONTAWESOME_KIT: process.env.FONTAWESOME_KIT,
    CLOUDINARY_UPLOAD_PRESET: process.env.CLOUDINARY_UPLOAD_PRESET,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API: process.env.CLOUDINARY_API,
  },

  images: {
    domains: ['res.cloudinary.com'],
  },
};
