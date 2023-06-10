import axios, { AxiosResponse } from "axios";
import { Product } from "../types/product";
import { getConfig } from "./config";

const API_URL = "https://shopping-app-v2-api.onrender.com/api/";
const ALL_URL = "https://shopping-app-v2-api.onrender.com/";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const all = axios.create({
  baseURL: ALL_URL,
  withCredentials: true,
});

export const addProduct = async (
  formData: FormData
): Promise<{ data: Product }> => {
  try {
    const token = sessionStorage.getItem("token");
    const config = getConfig(token || "");

    return await api.post(
      "/product",
      formData,

      {
        headers: {
          "Content-Type": "multipart/form-data",
          ...config.headers,
        },
      }
    );
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      // eslint-disable-next-line
      throw new Error(err.response?.data);
    } else {
      throw new Error("Unexpected error");
    }
  }
};

type EditProductProps = {
  formData: FormData;
  productId: string;
};

export const editProduct = async ({
  formData,
  productId,
}: EditProductProps): Promise<{ data: Product }> => {
  try {
    const token = sessionStorage.getItem("token");
    const config = getConfig(token || "");

    return await api.put(`/product/${productId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...config.headers,
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
    const token = sessionStorage.getItem("token");
    const config = getConfig(token || "");
    const response: AxiosResponse<Product[]> = await api.get(
      "/products",
      config
    );

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

export const getUserProduct = async (id: string): Promise<Product[]> => {
  try {
    const response: AxiosResponse<Product[]> = await all.get(`/product/${id}`);

    const product = response.data;

    return product;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      // eslint-disable-next-line
      throw new Error(err.response?.data);
    } else {
      throw new Error("Unexpected error");
    }
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const token = sessionStorage.getItem("token");
    const config = getConfig(token || "");

    return await api.delete(`/product/${id}`, config);
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      // eslint-disable-next-line
      throw new Error(err.response?.data);
    } else {
      throw new Error("Unexpected error");
    }
  }
};
