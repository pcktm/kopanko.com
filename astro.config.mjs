import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import metaTags from "astro-meta-tags";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), metaTags(), icon()],
  image: {
    domains: ["graphassets.com"],
    remotePatterns: [{
      protocol: 'https',
      hostname: '**.graphassets.com',
    }]
  },
  prefetch: true,
});