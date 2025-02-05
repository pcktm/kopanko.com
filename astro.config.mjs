import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import metaTags from "astro-meta-tags";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), metaTags(), icon()],
  vite: {
    plugins: [tailwindcss()]
  },
  image: {
    domains: ["graphassets.com"],
    remotePatterns: [{
      protocol: 'https',
      hostname: '**.graphassets.com',
    }]
  },
  prefetch: true,
});