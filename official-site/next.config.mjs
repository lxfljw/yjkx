/** @type {import('next').NextConfig} */
const isGhPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: isGhPages ? "/yjkx" : "",
  assetPrefix: isGhPages ? "/yjkx/" : "",
};

export default nextConfig;
