import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { remarkReadingTime } from './src/lib/remark-reading-time.mjs';
import ogimage from "./integrations/og-image.mjs";
import image from "@astrojs/image";
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// https://astro.build/config
export default defineConfig({
  site: 'https://raresportan.com',
  markdown: {
    syntaxHighlight: 'prism',
    rehypePlugins: [remarkReadingTime, rehypeAutolinkHeadings],
    extendDefaultPlugins: true,
  },
  integrations: [
    mdx({
      rehypePlugins: [remarkReadingTime, rehypeAutolinkHeadings],
    }), 
    sitemap(), 
    // ogimage({
    //   config: {
    //     path: "/posts/",
    //   },
    // }),
    image()]
});