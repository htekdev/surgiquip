import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import rehypeBlogTables from './scripts/rehype-blog-tables.mjs';
import { retiredPartnerRedirects, includeCurrentPage } from './scripts/retired-partner-routes.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://surgiquip.com',
  output: 'static',
  adapter: vercel({
    webAnalytics: { enabled: false },
  }),
  redirects: retiredPartnerRedirects,
  integrations: [sitemap({ filter: includeCurrentPage })],
  markdown: {
    rehypePlugins: [rehypeBlogTables],
  },
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
