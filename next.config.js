/** @type {import('next').NextConfig} */

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || "http://127.0.0.1:8000"

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  rewrites: async () => {
    return [
      {
        source: '/api/ai/:path*',
        destination: `${AI_SERVICE_URL}/public/:path*`,
      },
      {
        source: '/api/oaidalleapiprodscus/:path*',
        destination: 'https://oaidalleapiprodscus.blob.core.windows.net/:path*'
      }
    ]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: {
        loader: '@svgr/webpack',
        options: {
          svgo: true,

          svgoConfig: {
            multipass: true,
            plugins: [
              {
                name: 'prefixIds',
                params: {
                  overrides: {
                    removeViewBox: false,
                  },
                },
              },
            ],
          },
        },
      },
    });
    return config;
  },
}
module.exports = nextConfig
