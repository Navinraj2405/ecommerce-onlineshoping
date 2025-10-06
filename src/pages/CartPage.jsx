 // src/pages/CartPage.jsx
import React, { useContext } from "react";
import { CartContext } from "../Context/CartContext";

function CartPage() {
  const { cart, removeFromCart } = useContext(CartContext);
  const totalPrice = cart.reduce((total, product) => total + product.price, 0);

  if (cart.length === 0) {
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
            <p className="mt-4 text-center font-semibold text-gray-800">
              {product.title}
            </p>
            <p className="text-green-700 font-bold mt-2">${product.price}</p>
            <button
              onClick={() => removeFromCart(product.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-red-600 transition-colors"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Total Price */}
      <div className="mt-8 p-5 bg-yellow-100 rounded-xl shadow-md flex justify-between items-center max-w-md mx-auto">
        <span className="text-xl font-semibold text-gray-800">Total Price:</span>
        <span className="text-xl font-bold text-green-700">${totalPrice.toFixed(2)}</span>
      </div>
    </div>
  );
}

export default CartPage;
