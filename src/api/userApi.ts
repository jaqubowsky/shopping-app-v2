import axios, { AxiosResponse } from "axios";
import { LoginValues, RegisterValues, UserResponse } from "../types/user";

const API_URL = "http://localhost:3001/api/";
const ALL_URL = "http://localhost:3001";

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
    await all.post("/register", registerValues);
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
    await all.post("/login", formValues);
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
    const response: AxiosResponse<UserResponse> = await all.get("/logged-in");
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
    return await api.delete(`/user/${userId}`);
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
        `/user/${id}`
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
