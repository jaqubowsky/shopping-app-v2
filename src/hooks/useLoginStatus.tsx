import { useEffect, useState } from "react";
import { UserObject } from "../types/user";
import { checkLoginStatus } from "../api/userApi";
import { getErrorMessage } from "../utils/getErrorMessage";

const useLoginStatus = () => {
  const [user, setUser] = useState<UserObject | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchUser = async () => {
    const data = await checkLoginStatus();
    setUser(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUser().catch((err) => {
      setError(getErrorMessage(err));
      setIsLoading(false);
    });
  }, []);

  return { user, error, isLoading };
};

export default useLoginStatus;
