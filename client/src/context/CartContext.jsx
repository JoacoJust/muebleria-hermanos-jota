import { createContext, useContext } from "react";
import { useCart as useCartState } from "../hooks/useCart";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const cart = useCartState();
  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }
  return context;
}
