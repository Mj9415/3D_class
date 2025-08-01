// postcss.config.cjs 파일 - CommonJS 형식 사용
const tailwindcss = require("@tailwindcss/postcss");
const autoprefixer = require("autoprefixer");

module.exports = {
  plugins: [
    tailwindcss,
    autoprefixer,
    // 다른 플러그인들...
  ],
};
