<template>
  <div
    class="ps-relative ps-overflow-hidden ps-w-full"
    @mouseover="pauseAutoScroll"
    @mouseleave="startAutoScroll"
  >
    <div
      class="ps-flex ps-transition-transform ps-duration-500 ps-ease-in-out"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div
        v-for="(product, index) in products"
        :key="index"
        class="ps-min-w-full ps-flex ps-justify-center ps-items-center"
      >
        <div class="ps-text-center ps-p-4">
          <img
            :src="product.image"
            :alt="product.name"
            width="200"
            class="ps-w-48 ps-mx-auto ps-mb-4 ps-rounded-md ps-object-cover"
          />
          <p class="ps-text-lg ps-font-semibold ps-pb-3">{{ product.name }}</p>
        </div>
      </div>
    </div>

    <button
      @click="prevSlide"
      class="ps-absolute ps-top-1/2 ps-left-0 ps-transform ps--translate-y-1/2 ps-bg-gray-800 ps-text-white ps-rounded-full ps-p-2 ps-m-2 hover:ps-bg-gray-700 focus:ps-outline-none"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        class="ps-w-6 ps-h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>

    <button
      @click="nextSlide"
      class="ps-absolute ps-top-1/2 ps-right-0 ps-transform ps--translate-y-1/2 ps-bg-gray-800 ps-text-white ps-rounded-full ps-p-2 ps-m-2 hover:ps-bg-gray-700 focus:ps-outline-none"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        class="ps-w-6 ps-h-6"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>

    <div
      class="ps-absolute ps-bottom-0 ps-left-1/2 ps-transform ps--translate-x-1/2 ps-flex ps-space-x-2"
    >
      <span
        v-for="(product, index) in products"
        :key="index"
        :class="{
          'ps-bg-gray-200': index === currentIndex,
          'ps-bg-gray-400': index !== currentIndex,
        }"
        class="ps-h-3 ps-w-3 ps-rounded-full ps-cursor-pointer"
        @click="goToSlide(index)"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      autoScrollInterval: null,
      products: [],
    };
  },
  mounted() {
    this.fetchProducts();
    this.startAutoScroll();
  },
  methods: {
    fetchProducts() {
      fetch("https://fakestoreapi.com/products")
        .then((response) => response.json())
        .then((data) => {
          this.products = data.map((product) => ({
            name: product.title,
            image: product.image,
          }));
        })
        .catch((error) => console.error("Error fetching products:", error));
    },
    startAutoScroll() {
      this.autoScrollInterval = setInterval(this.nextSlide, 3000);
    },
    pauseAutoScroll() {
      clearInterval(this.autoScrollInterval);
    },
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.products.length;
    },
    prevSlide() {
      this.currentIndex =
        (this.currentIndex - 1 + this.products.length) % this.products.length;
    },
    goToSlide(index) {
      this.currentIndex = index;
    },
  },
  beforeDestroy() {
    clearInterval(this.autoScrollInterval);
  },
};
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
