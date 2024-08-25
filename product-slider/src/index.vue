<template>
  <div
    class="relative overflow-hidden w-full"
    @mouseover="pauseAutoScroll"
    @mouseleave="startAutoScroll"
  >
    <div
      class="flex transition-transform duration-500 ease-in-out"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div
        v-for="(product, index) in products"
        :key="index"
        class="min-w-full flex justify-center items-center"
      >
        <div class="text-center p-4">
          <img
            :src="product.image"
            :alt="product.name"
            width="200"
            class="w-48 mx-auto mb-4 rounded-md object-cover"
          />
          <p class="text-lg font-semibold pb-3">{{ product.name }}</p>
        </div>
      </div>
    </div>

    <button
      @click="prevSlide"
      class="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 m-2 hover:bg-gray-700 focus:outline-none"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        class="w-6 h-6"
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
      class="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 m-2 hover:bg-gray-700 focus:outline-none"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>

    <div
      class="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2"
    >
      <span
        v-for="(product, index) in products"
        :key="index"
        :class="{
          'bg-gray-200': index === currentIndex,
          'bg-gray-400': index !== currentIndex,
        }"
        class="h-3 w-3 rounded-full cursor-pointer"
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
