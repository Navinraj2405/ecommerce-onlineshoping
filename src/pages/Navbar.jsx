 

import React, { useContext, useEffect, useState } from "react"; // ✅ Added useState
import { Link, useNavigate } from "react-router-dom"; // ✅ Combined imports
import { CartContext } from "../Context/CartContext";
import  auth  from "../config/Firebase"; // ✅ Make sure you're exporting auth correctly in Firebase config
import { signOut } from "firebase/auth";

function Navbar() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const [log, setLog] = useState(false); // ✅ Fixed variable name casing (React prefers camelCase)

  useEffect(() => {
    // ✅ Store unsubscribe to clean up listener
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLog(true);
      } else {
        setLog(false);
      }
    });

    // ✅ Cleanup on unmount
    return () => unsubscribe();
  }, []);

  function logout() {
    signOut(auth)
      .then(() => {
        setLog(false);
        navigate("/"); // Optional: redirect to home/login after sign out
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  }

  return (
    <nav className="bg-yellow-300 flex justify-between py-8 px-3 items-center">
      {/* Logo */}
      <Link to="/home">
        <h1 className="text-3xl font-bold">MyShop</h1>
      </Link>

      {/* Right Side: Cart + Login */}
      <div className="space-x-5 flex items-center">
        <Link to="/cartpage">
          <div className="relative">
            {/* ✅ Only show cart count if > 0 */}
            {cart.length > 0 && (
              <p className="bg-red-600 text-white px-2 rounded-full text-xs absolute -top-2 -right-2">
                {cart.length}
              </p>
            )}
            <img
              src="shopping-cart.png"
              alt="shopping cart"
              className="w-8 inline"
            />
          </div>
        </Link>
        <div>
           
          <img src="location-pin.png" alt="location" className="w-8 inline hover:cursor-pointer"  onClick={()=> navigate("/address")}/>
        </div>

        {log ? (
          <button
            className="bg-black text-yellow-50 px-5 py-2 rounded-xl"
            onClick={logout}
          >
            Logout
          </button>
        ) : (
          <button
            className="bg-black text-yellow-50 px-5 py-2 rounded-xl"
            onClick={() => navigate("/")}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

