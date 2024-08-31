import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      remotes: {
        ReactApp: 'http://localhost:5001/assets/remoteEntry.js',
        VueApp: 'http://localhost:5002/assets/remoteEntry.js',
        SvelteApp: 'http://localhost:5003/assets/remoteEntry.js',
      },
      shared: ["react", "react-dom", "vue", "svelte"],
    }),
  ],
});
