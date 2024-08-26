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

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Index;
