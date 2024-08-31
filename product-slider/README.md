# Product Slider

In this project, we will create a microfrontend for the product slider section from the [Mart](mart.ps) website using the Vue framework.

## How we will do it

1. Create a Vue project
2. Create a Product Slider component
3. Fetch the data from the API
4. Display the data in the Product Slider component
5. Bundle the project

```bash
npm run bundle
```

## How to use module federation in Vue

1. Install the `@originjs/vite-plugin-federation` package
2. Add the plugin to the Vite configuration

```javascript
import { defineConfig } from "vite";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    federation({
      name: "productSlider",
      filename: "remoteEntry.js",
      exposes: {
        "./ProductSlider": "./src/ProductSlider.vue",
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

![Product Slider](../screenshots/product-slider.png)
