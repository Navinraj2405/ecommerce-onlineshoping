// src/pages/ProductDetails.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <h2 className="text-center mt-10">Loading...</h2>;
  if (!product) return <h2 className="text-center mt-10">Product not found</h2>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-8 bg-yellow-50 min-h-screen">
  {/* Left side: Image gallery */}
  <div className="flex flex-col items-center justify-center space-y-6">
    <img
      src={product.images?.[1] || "https://via.placeholder.com/400"}
      alt={product.title}
      className="w-72 h-72 object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
    />
    <img
      src={product.images?.[2] || "https://via.placeholder.com/400"}
      alt={product.title}
      className="w-72 h-72 object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
    />
  </div>

  {/* Right side: Product details */}
  <div className="flex flex-col items-center text-center bg-white shadow-xl rounded-2xl p-8 border border-yellow-200">
    <h1 className="text-4xl font-bold mb-4 text-gray-800">{product.title}</h1>
    <img
      src={product.images?.[0] || "https://via.placeholder.com/400"}
      alt={product.title}
      className="w-80 h-80 object-contain mb-6 rounded-lg"
    />
    <p className="text-lg text-gray-700 leading-relaxed mb-3">{product.description}</p>
    <p className="text-3xl font-semibold text-yellow-700">${product.price}</p>
    <p className="text-sm text-gray-600 mt-2 mb-6">
      Category: <span className="font-medium">{product.category?.name || "N/A"}</span>
    </p>
    <div className="flex flex-col sm:flex-row gap-4">
      <button
        onClick={() => addToCart(product)}
        className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition"
      >
        🛒 Add to Cart
      </button>
      <Link to="/cartpage">
        <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition">
          Go to Cart
        </button>
      </Link>
    </div>
  </div>
</div>

  );
}

export default ProductDetails;
