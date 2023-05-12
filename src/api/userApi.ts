import axios, { AxiosResponse } from "axios";
import { LoginValues, RegisterValues, UserResponse } from "../types/user";

const API_URL = "http://localhost:3001";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const registerWithEmailAndPassword = async (
  registerValues: RegisterValues
) => {
  try {
    await api.post("/register", registerValues);
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      // eslint-disable-next-line
      throw new Error(err.response?.data);
    } else {
      throw new Error("Unexpected error");
    }
  }
};

export const loginWithEmailAndPassword = async (formValues: LoginValues) => {
  try {
    await api.post("/login", formValues);
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      // eslint-disable-next-line
      throw new Error(err.response?.data.message);
    } else {
      throw new Error("Unexpected error");
    }
  }
};

export const checkLoginStatus = async (): Promise<UserResponse> => {
  try {
    const response: AxiosResponse<UserResponse> = await api.get("/logged-in");
    const userData = response.data;
    console.log(userData)
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

export const signOut = async () => {
  try {
    await api.get("/logout");
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      // eslint-disable-next-line
      throw new Error(err.response?.data);
    } else {
      throw new Error("Unexpected error");
    }
  }
};
