const path = require("path");
const withTM = require("next-transpile-modules")(["swiper", "ssr-window","dom7","react-sticky-box"]);

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  optimizeFonts: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    JWT_SECRET: "asdfghjklnbvcxzqwertyuiopmkioprewqasderfgnujm",
    AWS_SES_USER: "...",
    AWS_SES_PASSWORD: ".....",
    CLOUD_NAME: "dw5te3zpl",
    UPLOAD_PRESETS: "dkpwxp4y",
    CLOUDINARY_URL: "https://api.cloudinary.com/v1_1/dw5te3zpl/image/upload",
    CLOUDINARY_VIDEO_URL: "https://api.cloudinary.com/v1_1/dw5te3zpl/video/upload",
    CLOUDINARY_ZIP_URL: "https://api.cloudinary.com/v1_1/dw5te3zpl/raw/upload",
    STRIPE_SECRET_KEY: "sk_test_....",
    STRIPE_PUBLISHABLE_KEY: "pk_test_.....",
  },
};

module.exports = withTM(nextConfig);
