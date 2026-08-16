
/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false, // ری‌ست پایه تیلویند رو غیرفعال می‌کنه تا با antd تداخل نکنه
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

