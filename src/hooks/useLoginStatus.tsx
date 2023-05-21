import { useEffect, useState } from "react";
import { UserHookResponse, UserResponse } from "../types/user";
import { checkLoginStatus } from "../api/userApi";
import { getErrorMessage } from "../utils/getErrorMessage";

const useLoginStatus = (): UserHookResponse => {
  const [userData, setUserData] = useState<UserResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await checkLoginStatus();
        setUserData(data);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userData]);

  return { userData, error, isLoading };
};

export default useLoginStatus;