/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Home redirect
      {
        source: '/',
        destination: '/dashboard/analysis',
        permanent: true,
      }
    ]
  },
};

export default nextConfig;
