import React, { useContext } from "react";
import { CartContext } from "../Context/CartContext";

function PaymentPage() {
  const { cart, setCart } = useContext(CartContext);
  const totalPrice = cart.reduce((total, product) => total + product.price * (product.quantity || 1), 0);

  const handlePayment = () => {
    if (cart.length === 0) {
      alert("❌ Payment Failed: Cart is empty!");
      return;
    }
    // Here you could call backend/payment API
    alert("✅ Payment Successful!");
    setCart([]); // clear cart after payment
  };

  if (cart.length === 0) {
    return (
      <div className="text-center mt-20 text-xl text-gray-600">
        Your cart is empty. Add some products before paying.
      </div>
    );
  }

  return (
    <div className="max-w-screen-md mx-auto p-5">
      <h1 className="text-3xl font-bold text-yellow-900 mb-6 text-center">
        Payment Summary
      </h1>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center bg-yellow-50 p-4 rounded-xl shadow hover:shadow-lg transition"
          >
            <div>
              <p className="font-semibold text-gray-800">{item.title}</p>
              <p className="text-gray-600">Qty: {item.quantity || 1}</p>
            </div>
            <p className="font-bold text-green-700">
              ${(item.price * (item.quantity || 1)).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 p-5 bg-yellow-100 rounded-xl shadow-md flex justify-between items-center">
        <span className="text-xl font-semibold text-gray-800">Total:</span>
        <span className="text-xl font-bold text-green-700">${totalPrice.toFixed(2)}</span>
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={handlePayment}
          className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-all duration-300"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}

export default PaymentPage;
