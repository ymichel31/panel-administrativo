/** @type {import('next').NextConfig} */

const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
  outputFileTracingRoot: __dirname,
  async redirects() {
    return [
      {
        source: '/admin/data-tables',
        destination: '/admin/clients',
        permanent: true,
      },
    ];
  },
  images: {
    domains: [
      'images.unsplash.com',
      'i.ibb.co',
      'scontent.fotp8-1.fna.fbcdn.net',
    ],
    // Make ENV
    unoptimized: true,
  },
};

// module.exports = withTM(nextConfig);
module.exports = nextConfig;
