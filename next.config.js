
module.exports = async (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    /* config options here */
    devPagesManifest: true,
    reactStrictMode: true,
  }
  return nextConfig
}