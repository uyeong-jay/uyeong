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
  //   // serverURL: process.env.SERVER_URL,
  // },
  // publicRuntimeConfig: {
  //   // Available on both server and client
  // },

  env: {
    NEXT_PUBLIC_BASE_URL: prod ? process.env.NEXT_PUBLIC_PROD_URL : process.env.DEV_URL,
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
    // 기본값
    // deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840]
    // imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
    deviceSizes: [640, 750, 828, 1080], // 너무 큰 이미지는 제거
    imageSizes: [128, 256, 384], // 너무 작은 이미지는 제거
    domains: ['res.cloudinary.com'], // 해당 경로 모든 이미지 허용
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.shields.io',
        pathname: '/badge/**', // badge 아래 경로만 이미지 허용
      },
    ],
  },
  experimental: {
    scrollRestoration: true,
  },
  output: 'standalone',

  webpack(config) {
    return {
      ...config,
      mode: prod ? 'production' : 'development',
      devtool: prod ? 'hidden-source-map' : 'eval-source-map', // src 폴더 숨기기
    };
  },
});
