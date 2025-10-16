 import React, { useContext, useEffect } from "react";
import { CartContext } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";

function CartPage({ user }) {
  const { cart, setCart, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch(`https://ecommerce-backend-xveu.onrender.com/api/cart/${user.uid}`);
        const data = await res.json();
        setCart(data);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      }
    };
    if (user) fetchCart();
  }, [user, setCart]);

  const totalPrice = cart.reduce((total, product) => total + product.price * (product.quantity || 1), 0);

  if (!cart || cart.length === 0) {
    return (
      <h2 className="text-center mt-20 text-2xl font-bold text-yellow-900">
        🛒 Your cart is empty
      </h2>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto p-5">
      <h1 className="text-3xl font-bold text-yellow-900 mb-6 text-center">
        Your Shopping Cart
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cart.map((product) => (
          <div
            key={product.id}
            className="flex flex-col items-center bg-yellow-50 border border-yellow-200 rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src={product.images?.[0] || product.image}
              alt={product.title}
              className="w-36 h-36 object-contain rounded-lg"
            />
            <p className="mt-4 text-center font-semibold text-gray-800">{product.title}</p>
            <p className="text-green-700 font-bold mt-2">${product.price.toFixed(2)}</p>

            <div className="flex items-center gap-3 mt-3">
              <button
                onClick={() => updateQuantity(product.id, (product.quantity || 1) - 1)}
                className="bg-gray-300 text-gray-800 px-3 py-1 rounded-full hover:bg-gray-400 transition"
              >
                −
              </button>
              <span className="font-semibold text-gray-800">{product.quantity || 1}</span>
              <button
                onClick={() => updateQuantity(product.id, (product.quantity || 1) + 1)}
                className="bg-gray-300 text-gray-800 px-3 py-1 rounded-full hover:bg-gray-400 transition"
              >
                +
              </button>
            </div>

            <p className="mt-2 text-gray-700 font-semibold">
              Subtotal: ${(product.price * (product.quantity || 1)).toFixed(2)}
            </p>

            <button
              onClick={() => removeFromCart(product.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-red-600 transition-colors"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 p-5 bg-yellow-100 rounded-xl shadow-md flex justify-between items-center max-w-md mx-auto">
        <span className="text-xl font-semibold text-gray-800">Total Price:</span>
        <span className="text-xl font-bold text-green-700">${totalPrice.toFixed(2)}</span>
      </div>

      {/* Checkout Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => navigate("/payment")}
          className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-all duration-300"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default CartPage;
