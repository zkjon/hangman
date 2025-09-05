// @ts-check
import { defineConfig } from "astro/config";

import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

import path from "node:path";

// https://astro.build/config
export default defineConfig({
  site: "https://your-domain.com", // Update this with your actual domain
  integrations: [preact(), sitemap()],

  vite: {
    // @ts-ignore - Tailwind CSS v4 plugin typing issue
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
  },
  devToolbar: {
    enabled: false,
  },
});
