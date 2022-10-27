/** @type {import('next').NextConfig} */
const prod = process.env.NODE_ENV === 'production';
module.exports = {
  reactStrictMode: true,

  env: {
    BASE_URL: prod ? '' : process.env.BASE_URL,
    FONTAWESOME_KIT: process.env.FONTAWESOME_KIT,
  },

  images: {
    domains: ['res.cloudinary.com'],
  },
};
