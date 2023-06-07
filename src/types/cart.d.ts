import { Product } from "./product";

export type CartItemsResponse = {
  cartItems: Array<{
    product: Product;
    addedAt: string;
    id: string;
  }>;
};
