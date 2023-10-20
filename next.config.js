/** @type {import('next').NextConfig} */

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || "http://127.0.0.1:8000"

const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => {
    return [
      {
        source: '/api/ai/:path*',
        destination: `${AI_SERVICE_URL}/api/:path*`,
      },
    ]
  },
}
module.exports = nextConfig
