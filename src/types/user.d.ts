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

export type UserResponse = {
  message: string;
  user: {
    username?: string;
    email?: string;
    imageUrl?: string;
    createdAt?: string;
    location?: string;
    phoneNumber?: number;
  };
};

export type OtherUserResponse = {
  user: {
    email: string;
    imageUrl: string;
    name: string;
    phoneNumber: number;
    username: string;
  };
};

export type UserHookResponse = {
  userData: UserResponse | null;
  isLoading: boolean;
  error: string | null;
};
