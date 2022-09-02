import * as fs from "fs";
import puppeteer from "puppeteer";
import { fileURLToPath } from "node:url";

export default function astroOGImage({config}){
  return {
    name: "astro-og-image",
    hooks: {
      "astro:build:done": async ({ dir, routes }) => {
        let path = config.path;
        console.log('PATH', path);
        // console.log('ROUTES', routes)
        // Filters all the routes that need OG image
        let filteredRoutes = routes.filter((route) =>
          route?.type === 'page' && route?.component?.endsWith('.mdx')
        );
        // console.log('filteredRoutes', filteredRoutes);

        // Creates a directory for the images if it doesn't exist already
        let directory = fileURLToPath(new URL(`./assets/twitter-cards`, dir));
        if (!fs.existsSync(directory)) {
          fs.mkdirSync(directory);
        }

        const browser = await puppeteer.launch();
        for (const route of filteredRoutes) {
          // Gets the title
          const data = fs.readFileSync(
            route?.distURL?.pathname,
            "utf-8"
          );
          // console.log(route, data);
          let title = await data.match(/<title[^>]*>([^<]+)<\/title>/)[1];

          // Get the html
          const html = fs
            .readFileSync("src/og-image/og-image.html", "utf-8")
            .toString()
            .replace("@title", title);

          const page = await browser.newPage();
          await page.setContent(html);
          await page.waitForNetworkIdle();
          await page.setViewport({
            width: 1200,
            height: 669,
          });

          await page.screenshot({
            path: fileURLToPath(new URL(`./assets/twitter-cards${route.pathname}.png`, dir)),
            encoding: "binary",
          });
        }
        await browser.close();
      },
    },
  };
}