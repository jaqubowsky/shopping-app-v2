import { useState, useEffect } from "react";
import useLoginStatus from "../../hooks/useLoginStatus";

const AccountDate = () => {
  const { userData, isLoading } = useLoginStatus();
  const [accountAge, setAccountAge] = useState({
    days: 0,
    months: 0,
    years: 0,
  });

  useEffect(() => {
    if (!isLoading && userData?.user.createdAt) {
      const currentDate = new Date();
      const accountCreationDate = new Date(userData.user.createdAt);

      const diff = currentDate.getTime() - accountCreationDate.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const months = Math.floor(days / 30);
      const years = Math.floor(days / 365);

      setAccountAge({ days: days % 31, months: months % 12, years });
    }
  }, [isLoading, userData?.user.createdAt]);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="flex flex-col items-start">
      <h2 className="mb-1 text-3xl">You have been with us:</h2>
      <h3 className="text-xl text-yellow-800 drop-shadow-2xl">
        {accountAge.years} {accountAge.years === 1 ? "year" : "years"},{" "}
        {accountAge.months} {accountAge.months === 1 ? "month" : "months"} and{" "}
        {accountAge.days} {accountAge.days === 1 ? "day" : "days"}
      </h3>
    </div>
  );
};

export default AccountDate;