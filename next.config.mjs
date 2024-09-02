/** @type {import('next').NextConfig} */
const nextConfig = {
    // Configuration options
    swcMinify: false, // Optional: Enable or disable SWC minification
    webpack: function (config, context) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
      return config;
    },
  };
  
  export default nextConfig;
  