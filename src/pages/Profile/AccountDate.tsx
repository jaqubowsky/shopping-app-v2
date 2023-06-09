import { useState, useEffect } from "react";
import { UserResponse } from "../../types/user";

type AccountAgeProps = {
  userData: UserResponse | undefined;
};

const AccountDate = ({ userData }: AccountAgeProps) => {
  const [accountAge, setAccountAge] = useState({
    days: 0,
    months: 0,
    years: 0,
  });

  useEffect(() => {
    if (userData?.user.createdAt) {
      const currentDate = new Date();
      const accountCreationDate = new Date(userData.user.createdAt);

      const diff = currentDate.getTime() - accountCreationDate.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const months = Math.floor(days / 30);
      const years = Math.floor(days / 365);

      setAccountAge({ days: days % 31, months: months % 12, years });
    }
  }, [userData?.user.createdAt]);

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-xl text-yellow-800 drop-shadow-2xl">
        {accountAge.years} {accountAge.years === 1 ? "year" : "years"},{" "}
        {accountAge.months} {accountAge.months === 1 ? "month" : "months"} and{" "}
        {accountAge.days} {accountAge.days === 1 ? "day" : "days"}
      </h3>
    </div>
  );
};

export default AccountDate;
