import { createContext, useContext } from "react";
import { QueryObserverResult } from "@tanstack/react-query";
import { CartItemsResponse } from "../types/cart";

interface CartContextType {
  cartData: CartItemsResponse | undefined;
  refetchCart: () => Promise<QueryObserverResult<CartItemsResponse, unknown>>;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export default function useCartContext(): CartContextType {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
}
