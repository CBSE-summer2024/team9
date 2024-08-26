<script lang="ts">
  import { onMount } from "svelte";

  interface Product {
    id: number;
    title: string;
    image: string;
  }

  let products: Product[] = [];
  let isPaused = false;

  onMount(async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data: Product[] = await response.json();
      products = data.map((product) => ({
        id: product.id,
        title: product.title,
        image: product.image,
      }));
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  });

  function togglePause() {
    isPaused = !isPaused;
  }
</script>

<div class="scrolling-list-wrapper">
  <div
    class="gap-4 scrolling-list {isPaused ? 'paused' : ''}"
    on:mouseenter={togglePause}
    on:mouseleave={togglePause}
  >
    {#each [...products, ...products, ...products] as product}
      <div
        class="flex-shrink-0 w-48 bg-gray-100 p-4 rounded-lg shadow-md text-center"
      >
        <img
          src={product.image}
          alt={product.title}
          class="w-32 h-32 object-cover mx-auto rounded-md"
        />
        <h2 class="mt-2 text-primary-700 text-sm font-semibold truncate">
          {product.title}
        </h2>
      </div>
    {/each}
  </div>
</div>

<style>
  .scrolling-list-wrapper {
    overflow: hidden;
    position: relative;
    width: 100%;
  }
  .scrolling-list {
    display: flex;
    animation: scroll 30s linear infinite;
    white-space: nowrap;
    padding: 1rem;
  }
  .scrolling-list.paused {
    animation-play-state: paused;
  }

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-100%);
    }
  }
</style>
