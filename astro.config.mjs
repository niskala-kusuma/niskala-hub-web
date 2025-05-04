import { defineConfig } from 'astro/config';
// https://astro.build/config
export default defineConfig({
  // Your existing configuration options
  // Enable environment variables
    vite: {
    envPrefix: 'GENERIC_'
    },
    i18n: {
      locales: ["id", "en"],
      defaultLocale: "en",
      routing: {
        prefixDefaultLocale: true, // Default locale tidak punya prefix
      },
    },
});