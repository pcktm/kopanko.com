import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import metaTags from "astro-meta-tags";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), metaTags()],
  image: {
    domains: ["graphassets.com"]
  },
  prefetch: true,
});