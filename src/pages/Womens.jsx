 import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";

function Womens() {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    // Fetch women's clothing category
    fetch("https://fakestoreapi.com/products/category/women's clothing")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        // Initialize quantity for each product as 1
        const initialQuantities = {};
        data.forEach((item) => {
          initialQuantities[item.id] = 1;
        });
        setQuantities(initialQuantities);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const increaseQty = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
  };

  const decreaseQty = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    addToCart({ ...product, quantity });
  };

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold text-center mb-8 text-yellow-900">
        Women's Collection
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col items-center shadow-xl rounded-xl p-4 hover:scale-105 transition-transform bg-white border border-yellow-100"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-32 h-32 object-contain mx-auto"
            />
            <p className="mt-2 text-center font-medium text-sm line-clamp-2 text-gray-800">
              {product.title}
            </p>
            <p className="mt-2 font-semibold text-green-700">
              ${product.price.toFixed(2)}
            </p>

            {/* Quantity Controls */}
            <div className="flex items-center gap-3 mt-3">
              <button
                onClick={() => decreaseQty(product.id)}
                className="bg-gray-300 text-gray-800 px-3 py-1 rounded-full hover:bg-gray-400 transition"
              >
                −
              </button>
              <span className="font-semibold text-gray-800">
                {quantities[product.id] || 1}
              </span>
              <button
                onClick={() => increaseQty(product.id)}
                className="bg-gray-300 text-gray-800 px-3 py-1 rounded-full hover:bg-gray-400 transition"
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={() => handleAddToCart(product)}
              className="bg-black text-white px-4 py-2 rounded-md mt-3 hover:bg-gray-800 transition"
            >
              🛒 Add {quantities[product.id] || 1} to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Go to Cart Button */}
      <div className="flex justify-center mt-8">
        <Link to="/cartpage">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
            Go to Cart
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Womens;
