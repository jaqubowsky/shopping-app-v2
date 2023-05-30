import { createContext, useContext } from "react";
import { UserResponse } from "../types/user";
import { QueryObserverResult } from "@tanstack/react-query";

interface UserContextType {
  userData: UserResponse | undefined;
  refetch: () => Promise<QueryObserverResult<UserResponse, unknown>>;
  isLoggedIn: boolean;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export default function useUserContext(): UserContextType {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserDataProvider");
  }
  return context;
}
