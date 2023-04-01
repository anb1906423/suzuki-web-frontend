module.exports = async (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
      return [
        {
          source: "/products/:id",
          destination: "/products/[id]",
        },
      ];
    },
  };
  return nextConfig;
};
