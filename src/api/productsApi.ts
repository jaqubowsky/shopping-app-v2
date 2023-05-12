import axios, { AxiosResponse } from "axios";
import { Product } from "../types/product";

const API_URL = "http://localhost:3001/api/";
const ALL_URL = "http://localhost:3001/";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const all = axios.create({
  baseURL: ALL_URL,
  withCredentials: true,
});

export const addProduct = async (formData: FormData) => {
  try {
    await api.post("/product", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      // eslint-disable-next-line
      throw new Error(err.response?.data);
    } else {
      throw new Error("Unexpected error");
    }
  }
};

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response: AxiosResponse<Product[]> = await all.get("/allproducts");

    const products = response.data;

    return products;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      // eslint-disable-next-line
      throw new Error(err.response?.data);
    } else {
      throw new Error("Unexpected error");
    }
  }
};

export const getUserProducts = async (): Promise<Product[]> => {
  try {
    const response: AxiosResponse<Product[]> = await api.get("/products");

    const products = response.data;

    return products;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      // eslint-disable-next-line
      throw new Error(err.response?.data);
    } else {
      throw new Error("Unexpected error");
    }
  }
};
