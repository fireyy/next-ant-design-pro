/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard/analysis',
        permanent: true,
      },
      {
        source: '/account',
        destination: '/account/center',
        permanent: true,
      },
      {
        source: '/dashboard',
        destination: '/dashboard/analysis',
        permanent: true,
      },
      {
        source: '/exception',
        destination: '/exception/403',
        permanent: true,
      },
      {
        source: '/form',
        destination: '/form/basic-form',
        permanent: true,
      },
      {
        source: '/list',
        destination: '/list/basic-list',
        permanent: true,
      },
      {
        source: '/profile',
        destination: '/profile/basic',
        permanent: true,
      },
      {
        source: '/result',
        destination: '/result/success',
        permanent: true,
      },
      {
        source: '/user',
        destination: '/user/login',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
