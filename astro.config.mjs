import { defineConfig } from "astro/config";

import react from "@astrojs/react";

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  integrations: [react(), tailwind()],
  site: 'https://lauta3011.github.io',
  base: '/letsgo/',
});
