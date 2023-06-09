import axios, { AxiosResponse } from "axios";
import { Product } from "../types/product";

const API_URL = "https://shopping-app-v2-api.onrender.com/";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const addToCart = async (productId: string) => {
  try {
    return await api.post("/cart", { productId: productId });
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      // eslint-disable-next-line
      throw new Error(err.response?.data);
    } else {
      throw new Error("Unexpected error");
    }
  }
};

export const removeFromCart = async (productId: string) => {
  try {
    return await api.delete(`/cart/${productId}`);
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      // eslint-disable-next-line
      throw new Error(err.response?.data);
    } else {
      throw new Error("Unexpected error");
    }
  }
};

export const getCartItems = async (): Promise<Product[]> => {
  try {
    const response: AxiosResponse<Product[]> = await api.get(`/cart`);
    
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.log(err)
      // eslint-disable-next-line
      throw new Error(err.response?.data);
    } else {
      throw new Error("Unexpected error");
    }
  }
};
