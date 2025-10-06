import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./Context/CartContext";
import Navbar from "./pages/Navbar";
import Homepage from "./pages/Homepage";
import Productpage from "./pages/Productpage";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Address from "./pages/Address";
import Electronics from "./pages/Electronics";
import Accessories from "./pages/Accessories";
import Womens from "./pages/Womens";
import "./App.css";

function Layout() {
  const location = useLocation();

  // Hide Navbar on Login and Signup pages
  const hideNavbar =
    location.pathname === "/" || location.pathname === "/signup";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/cartpage" element={<CartPage />} />
        <Route path="/address" element={<Address />} />
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
  return (
    <CartProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
