/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
      },
      {
        // Tu dominio de Strapi en producción
        protocol: 'https',
        hostname: '*.strapi.io',
      },
      {
        // Si usas Strapi Cloud
        protocol: 'https',
        hostname: '*.media.strapiapp.com',
      },
      {
        // Strapi Cloud - Fundación Posadas
        protocol: 'https',
        hostname: 'creative-appliance-4f3edc677d.strapiapp.com',
      },
      {
        // Strapi Cloud general
        protocol: 'https',
        hostname: '*.strapiapp.com',
      },
    ],
  },
  // Permitir CORS para desarrollo local con Strapi
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
