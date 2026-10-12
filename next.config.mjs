/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "it"],
    defaultLocale: "it",
  },
  sassOptions: {
    includePaths: ["src/styles"],
    prependData: `@import "./src/styles/default/";`,
  },
};

export default nextConfig;
