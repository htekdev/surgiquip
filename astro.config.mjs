import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import rehypeBlogTables from './scripts/rehype-blog-tables.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://surgiquip.com',
  output: 'static',
  adapter: vercel({
    webAnalytics: { enabled: false },
  }),
  integrations: [sitemap()],
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
