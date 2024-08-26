import { useEffect, useState } from "react";
import "./index.css";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="pg-p-4 border pg-rounded-lg pg-shadow-md pg-bg-white">
      <img
        src={product.image}
        alt={product.title}
        className="pg-w-full pg-h-48 pg-object-cover pg-rounded-lg pg-mb-4"
      />
      <h2 className="pg-text-lg pg-font-semibold pg-mb-2 pg-line-clamp-1 pg-text-primary-500">
        {product.title}
      </h2>
      <p className="pg-text-sm pg-text-gray-600 pg-mb-2 pg-line-clamp-2">
        {product.description}
      </p>
      <p className="pg-text-lg pg-font-bold  pg-text-primary-800">
        ${product.price.toFixed(2)}
      </p>
    </div>
  );
};

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [orderBy, setOrderBy] = useState<[string, string]>(["", ""]);

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    const categories = products.map((product) => product.category);
    setCategories([...new Set(categories)]);
  }, [products]);

  useEffect(() => {
    let sortedProducts = [...products];
    if (orderBy.length > 0) {
      sortedProducts = sortedProducts.sort((a, b) => {
        if (orderBy[0] === "price") {
          return orderBy[1] === "asc" ? a.price - b.price : b.price - a.price;
        }
        return orderBy[1] === "asc"
          ? a.rating.rate - b.rating.rate
          : b.rating.rate - a.rating.rate;
      });
    }
    setFilteredProducts(sortedProducts);
  }, [products, orderBy]);

  return (
    <div className="pg-p-4">
      <div className="pg-flex pg-justify-between pg-items-center pg-mb-4">
        <div className="pg-flex pg-flex-wrap pg-gap-2 pg-mb-4">
          {categories.map((category) => (
            <span
              key={category}
              className={`pg-bg-gray-200 pg-px-2 pg-py-1 pg-rounded-lg pg-cursor-pointer ${
                selectedCategory === category ? "pg-bg-primary-400" : ""
              } `}
              onClick={() => {
                setSelectedCategory(category);
                setFilteredProducts(
                  products.filter((product) => product.category === category)
                );
              }}
            >
              {category}
            </span>
          ))}

          <span
            className={`pg-bg-gray-200 pg-px-2 pg-py-1 pg-rounded-lg pg-cursor-pointer ${
              selectedCategory === null ? "pg-bg-primary-400" : ""
            } `}
            onClick={() => {
              setSelectedCategory(null);
              setFilteredProducts(products);
            }}
          >
            All
          </span>
        </div>
        <div>
          <label htmlFor="orderBy" className="pg-mr-2">
            Order By
          </label>
          <select
            id="orderBy"
            className="pg-border pg-rounded-lg pg-p-2"
            onChange={(e) => {
              const [key, order] = e.target.value.split("-");
              setOrderBy([key, order]);
            }}
          >
            <option value="">Select</option>
            <option value="price-asc">Price Low to High</option>
            <option value="price-desc">Price High to Low</option>
            <option value="rating-asc">Rating Low to High</option>
            <option value="rating-desc">Rating High to Low</option>
          </select>
        </div>
      </div>

      <div className="pg-grid pg-grid-cols-1 sm:pg-grid-cols-2 md:pg-grid-cols-3 lg:pg-grid-cols-4 pg-gap-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Index;
