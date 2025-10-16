import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./Context/CartContext";
import Navbar from "./pages/Navbar";
import Homepage from "./pages/Homepage";
import Productpage from "./pages/Productpage";
import ProductDetails from "./pages/ProductDetails";
import PaymentPage from "./pages/PaymentPage";
import CartPage from "./pages/CartPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Address from "./pages/Address";
import Electronics from "./pages/Electronics";
import Accessories from "./pages/Accessories";
import Womens from "./pages/Womens";
import "./App.css";
import { onAuthStateChanged } from "firebase/auth";
import auth from "./config/Firebase";

function Layout({ user }) {
  const location = useLocation();
  const hideNavbar = location.pathname === "/" || location.pathname === "/signup";
  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/cartpage" element={<CartPage user={user} />} />
        <Route path="/address" element={<Address />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/productpage" element={<Productpage />} />
        <Route path="/electronics" element={<Electronics />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/womens" element={<Womens />} />
        <Route path="/productdetails/:id" element={<ProductDetails />} />
      </Routes>
    </>
  );
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <CartProvider>
        <Layout user={user} />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
