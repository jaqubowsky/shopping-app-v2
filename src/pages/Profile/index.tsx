import useLoginStatus from "../../hooks/useLoginStatus";
import { Avatar } from "@material-tailwind/react";


export default function Profile() {
  const { userData, isLoading } = useLoginStatus();
  const username = userData?.user.username;
  const email = userData?.user.email;
  const userImage = userData?.user.imageUrl;

  const userCreatedAt = userData?.user.createdAt;
  const userCreatedAtDate = new Date(userCreatedAt!);

  const daysFrom = new Date().getDay() - userCreatedAtDate.getDay();
  const monthsFrom = new Date().getMonth() - userCreatedAtDate.getMonth();
  const yearsFrom = new Date().getFullYear() - userCreatedAtDate.getFullYear();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="grid w-8/12 grid-cols-2 items-start justify-center p-4">
      <section className="flex justify-around gap-6 border-r border-gray-500">
        <div>
          <h2 className="text-3xl mb-1 font-bold">Hello, {username}!</h2>
          <h3 className="text-gray-600">{email}</h3>
        </div>
          <Avatar
            className="cursor-pointer rounded-full object-cover"
            src={userImage}
            alt={username}
            size="xxl"
          />
      </section>
      <section className=" ml-6">
        <div className="flex flex-col items-start">
          <h2 className="text-3xl mb-1">You are with us:</h2>
          <h3 className="text-xl text-yellow-800 drop-shadow-2xl">
            {yearsFrom} years, {monthsFrom} months and {daysFrom}{" "}
            {daysFrom === 1 ? "day" : "days"}
          </h3>
        </div>
      </section>
    </div>
  );
}
