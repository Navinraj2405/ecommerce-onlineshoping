 
  import React,   { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";

function Accessories() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    // ✅ Correct API endpoint for electronics category
    fetch("https://fakestoreapi.com/products/category/women's clothing")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold text-center mb-8">
        Women's Collection
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col items-center shadow-xl rounded-xl p-4 hover:scale-105 transition-transform bg-white"
          >
            {/* <Link to={`/ProductDetails/${product.id}`} className="text-center"> */}
              <img
                src={product.image}
                alt={product.title}
                className="w-32 h-32 object-contain mx-auto"
              />
              <p className="mt-2 text-center font-medium text-sm line-clamp-2">
                {product.title}
              </p>
            {/* </Link> */}

            <p className="mt-2 font-semibold">${product.price}</p>

            {/* ✅ Add to Cart button inside the map */}
            <button
              onClick={() => addToCart(product)}
              className="bg-black text-white px-4 py-2 rounded-md mt-3 hover:bg-gray-800"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* ✅ Optional: go to cart button */}
      <div className="flex justify-center mt-8">
        <Link to="/cartpage">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
            Go to Cart
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Accessories;
