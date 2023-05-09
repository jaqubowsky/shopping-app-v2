import axios, { AxiosResponse } from "axios";
import { LoginValues, RegisterValues, User, UserObject } from "../types/user";
import { AxiosError } from "axios";

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
      const axiosError = err as AxiosError;
      // eslint-disable-next-line
      throw new Error(axiosError.request?.response);
    } else {
      throw new Error("Unexpected error");
    }
  }
};

export const loginWithEmailAndPassword = async (loginValues: LoginValues) => {
  try {
    await api.post("/login", loginValues);
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      // eslint-disable-next-line
      throw new Error(err.request?.response);
    } else {
      throw new Error("Unexpected error");
    }
  }
};

export const checkLoginStatus = async (): Promise<UserObject> => {
  try {
    const response: AxiosResponse<User> = await api.get("/logged-in");

    const user = response.data;
    return user;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      // eslint-disable-next-line
      throw new Error(err.request?.response);
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
      throw new Error(err.request?.response);
    } else {
      throw new Error("Unexpected error");
    }
  }
};
