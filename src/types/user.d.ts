import { Product } from "./product";

export type User = {
  id: string;
  createdAt: string;

  email: string;
  username: string;
  picture: string;
  password: string;

  products: Product[];
};

export type RegisterValues = {
  username: string;
  email: string;
  password: string;
};

export type LoginValues = {
  email: string;
  password: string;
};

export type LoginData = {
  message: string;
  token: string;
};

export type UserObject = {
  username: string;
  email: string;
  picture: string;
};
