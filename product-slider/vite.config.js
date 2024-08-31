import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: "productSlider",
      filename: "remoteEntry.js",
      exposes: {
        "./ProductSlider": "./src/index.vue",
      },
      shared: ["vue"],
    }),
  ],
  build: {
    target: "esnext",
  },
});
