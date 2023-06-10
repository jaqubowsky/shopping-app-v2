import axios, { AxiosResponse } from "axios";
import { LoginValues, RegisterValues, UserResponse } from "../types/user";
import { getConfig } from "./config";

const API_URL = "https://shopping-app-v2-api.onrender.com/protected/api";
const ALL_URL = "https://shopping-app-v2-api.onrender.com/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const all = axios.create({
  baseURL: ALL_URL,
  withCredentials: true,
});

export const registerWithEmailAndPassword = async (
  registerValues: RegisterValues
) => {
  try {
    const response: AxiosResponse<RegisterResponse> = await all.post(
      "/users/register",
      registerValues
    );

    const token = response.data.token;
    sessionStorage.setItem("token", token);
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      // eslint-disable-next-line
      throw new Error(err.response?.data.message);
    } else {
      throw new Error("Unexpected error");
    }
  }
};

export const loginWithEmailAndPassword = async (formValues: LoginValues) => {
  try {
    const response: AxiosResponse<RegisterResponse> = await all.post(
      "/users/login",
      formValues
    );
    const token = response.data.token;

    sessionStorage.setItem("token", token);
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.log(err);
      // eslint-disable-next-line
      throw new Error(err.response?.data.message);
    } else {
      console.log(err);
      throw new Error("Unexpected error");
    }
  }
};

export const checkLoginStatus = async (): Promise<UserResponse> => {
  try {
    const token = sessionStorage.getItem("token");

    const config = getConfig(token || "");

    const response: AxiosResponse<UserResponse> = await all.get(
      "/users/logged-in",
      config
    );

    const userData = response.data;
    return userData;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.log(err.response);
      // eslint-disable-next-line
      throw new Error(err.response?.data);
    } else {
      throw new Error("Unexpected error");
    }
  }
};

export const deleteAccount = async (userId: string) => {
  try {
    const token = sessionStorage.getItem("token");
    const config = getConfig(token || "");

    return await api.delete(`/users/${userId}`, config);
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      // eslint-disable-next-line
      throw new Error(err.response?.data);
    } else {
      throw new Error("Unexpected error");
    }
  }
};

export const getUserById = async (
  id: string | undefined
): Promise<UserResponse> => {
  try {
    if (id) {
      const response: AxiosResponse<UserResponse> = await all.get(
        `/users/${id}`
      );
      const userData = response.data;

      return userData;
    } else {
      throw new Error("User not found");
    }
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      // eslint-disable-next-line
      throw new Error(err.response?.data);
    } else {
      throw new Error("Unexpected error");
    }
  }
};

export const signOut = () => {
  return new Promise<void>((resolve, reject) => {
    try {
      sessionStorage.removeItem("token");
      resolve(); // Resolve the promise if the operation is successful
    } catch (err) {
      reject(new Error("Unexpected error")); // Reject the promise with an error if an exception occurs
    }
  });
};
