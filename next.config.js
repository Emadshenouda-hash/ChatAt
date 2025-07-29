const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

module.exports = withMDX({
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  
  // ADD THIS i18n CONFIGURATION
  i18n: {
    locales: ['en', 'ar'], // List all supported locales
    defaultLocale: 'ar',   // Set your default locale
    localeDetection: false, // Optional: Set to true if you want Next.js to detect user's preferred locale
  },
});
