/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'assets.nflxext.com',
            port: '',
            pathname: '/**',
          }, {
            protocol: 'https',
            hostname: 'occ-0-2773-2774.1.nflxso.net',
            port: '',
            pathname: '/**',
          },
        ],
      },
}

module.exports = nextConfig
