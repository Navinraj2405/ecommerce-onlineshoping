 // src/Context/CartContext.jsx
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children, user }) => {
  const [cart, setCart] = useState([]);

  // Fetch cart when user logs in
  useEffect(() => {
    if (!user) {
      setCart([]);
      return;
    }

    const fetchCart = async () => {
      try {
        const res = await fetch(
          `https://ecommerce-backend-xveu.onrender.com/api/cart/${user.uid}`
        );
        const data = await res.json();
        setCart(
          Array.isArray(data)
            ? data.map((item) => ({
                ...item,
                productId: item.productId || item.id,
              }))
            : []
        );
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      }
    };

    fetchCart();
  }, [user]);

  // Add item to cart
  const addToCart = async (product) => {
    const existing = cart.find((p) => p.productId === product.id);
    const quantityToAdd = product.quantity || 1;

    if (existing) {
      setCart((prev) =>
        prev.map((p) =>
          p.productId === product.id
            ? { ...p, quantity: (p.quantity || 1) + quantityToAdd }
            : p
        )
      );
    } else {
      setCart((prev) => [
        ...prev,
        { ...product, productId: product.id, quantity: quantityToAdd },
      ]);
    }

    try {
      await fetch("https://ecommerce-backend-xveu.onrender.com/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: quantityToAdd,
          userId: user.uid,
        }),
      });
    } catch (err) {
      console.error("Failed to save cart item:", err);
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    setCart((prev) => prev.filter((p) => p.productId !== productId));

    try {
      await fetch(`https://ecommerce-backend-xveu.onrender.com/api/cart/${productId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.uid }),
      });
    } catch (err) {
      console.error("Failed to remove cart item:", err);
    }
  };

  // Update quantity
  const updateQuantity = async (productId, quantity) => {
    const safeQuantity = Math.max(1, quantity);

    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity: safeQuantity } : item
      )
    );

    try {
      await fetch(`https://ecommerce-backend-xveu.onrender.com/api/cart/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.uid, quantity: safeQuantity }),
      });
    } catch (err) {
      console.error("Failed to update cart item quantity:", err);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, setCart, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
