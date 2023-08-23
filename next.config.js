const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: false,
  basePath: isProd ? '/task-allocation-demo' : '',
  assetPrefix: isProd ? '/task-allocation-demo' : ''
};

module.exports = nextConfig;
