module.exports = async (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
      return [
        {
          source: '/',
          destination: '/index',
        },
        {
          source: "/:id",
          destination: "/[id]",
        },
      ];
    },
  };
  return nextConfig;
};
