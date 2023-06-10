import { createContext, useContext } from "react";
import { useQuery, QueryObserverResult } from "@tanstack/react-query";
import { UserResponse } from "../types/user";
import { checkLoginStatus } from "../api/userApi";

interface UserContextType {
  userData: UserResponse | undefined;
  refetch: () => Promise<QueryObserverResult<UserResponse, unknown>>;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export function UserDataProvider({ children }: { children: React.ReactNode }) {
  const { data: userData, refetch } = useQuery<UserResponse>(
    ["userData"],
    checkLoginStatus,
  );

  const value: UserContextType = {
    userData,
    refetch,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUserContext(): UserContextType {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserDataProvider");
  }
  return context;
}
