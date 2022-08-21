import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { remarkReadingTime } from './src/lib/remark-reading-time.mjs';

import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  site: 'https://raresportan.com',
  markdown: {
    syntaxHighlight: 'prism',
  },
  integrations: [mdx({
    rehypePlugins: [remarkReadingTime],
  }), sitemap(), image()]
});