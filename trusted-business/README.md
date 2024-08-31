# Trusted Business

In this project, we will create a microfrontend for the trusted business section from the [Mart](mart.ps) website using the Svelte framework.

## How we will do it

1. Create a Svelte project
2. Create a Trusted Business component
3. Fetch the data from the API
4. Display the data in the Trusted Business component
5. Bundle the project

```bash
npm run bundle
```

## How to use module federation in Svelte

1. Install the `@originjs/vite-plugin-federation` package
2. Add the plugin to the Vite configuration

```javascript
import { defineConfig } from "vite";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    federation({
      name: "trustedBusiness",
      filename: "remoteEntry.js",
      exposes: {
        "./TrustedBusiness": "./src/TrustedBusiness.svelte",
      },
    }),
  ],
});
```

3. Import the remote component in the container project

## How to run the project

```bash
npm run dev
```

## Screenshots

![Trusted Business](../screenshots/trusted-business.png)
