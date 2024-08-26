import { useEffect, useState } from "react";

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
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h2 className="text-lg font-semibold mb-2 line-clamp-1 text-primary-500">
        {product.title}
      </h2>
      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
        {product.description}
      </p>
      <p className="text-lg font-bold  text-primary-800">
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
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((category) => (
            <span
              key={category}
              className={`bg-gray-200 px-2 py-1 rounded-lg cursor-pointer ${
                selectedCategory === category ? "bg-primary-400" : ""
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
            className={`bg-gray-200 px-2 py-1 rounded-lg cursor-pointer ${
              selectedCategory === null ? "bg-primary-400" : ""
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
          <label htmlFor="orderBy" className="mr-2">
            Order By
          </label>
          <select
            id="orderBy"
            className="border rounded-lg p-2"
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Index;
