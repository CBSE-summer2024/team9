import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    federation({
      name: "trustedBusiness",
      filename: "remoteEntry.js",
      exposes: {
        "./TrustedBusiness": "./src/index.svelte",
      },
      shared: ["svelte"],
    }),
  ],
  build: {
    target: 'esnext',
  },
});
