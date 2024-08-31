<script lang="ts">
  interface Product {
    id: number;
    title: string;
    image: string;
  }

  let products: Product[] = [];
  let fetchData = true;

  $: if (fetchData) {
    fetchProducts();
  }

  async function fetchProducts() {
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
    } finally {
      fetchData = false;
    }
  }

  function togglePause() {
    isPaused = !isPaused;
  }

  let isPaused = false;
</script>

<div class="scrolling-list-wrapper">
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="tb-gap-4 scrolling-list"
    class:paused={isPaused}
    on:mouseenter={togglePause}
    on:mouseleave={togglePause}
  >
    {#each [...products, ...products, ...products] as product}
      <div
        class="tb-flex-shrink-0 tb-w-48 tb-bg-gray-100 tb-p-4 tb-rounded-lg tb-shadow-md tb-text-center"
      >
        <img
          src={product.image}
          alt={product.title}
          class="tb-w-32 tb-h-32 tb-object-cover tb-mx-auto tb-rounded-md"
        />
        <h2
          class="tb-mt-2 tb-text-primary-700 tb-text-sm tb-font-semibold tb-truncate"
        >
          {product.title}
        </h2>
      </div>
    {/each}
  </div>
</div>

<style scoped>
  @tailwind utilities;
  @tailwind components;
  @tailwind base;
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
