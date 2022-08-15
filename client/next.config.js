/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
    FONTAWESOME_KIT: process.env.FONTAWESOME_KIT,
  },
};
