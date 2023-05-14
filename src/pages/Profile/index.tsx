import useLoginStatus from "../../hooks/useLoginStatus";
import { Avatar } from "@material-tailwind/react";
import AccountDate from "./AccountDate";

export default function Profile() {
  const { userData, isLoading } = useLoginStatus();
  const username = userData?.user.username;
  const email = userData?.user.email;
  const userImage = userData?.user.imageUrl;

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="grid w-8/12 grid-cols-2 items-start justify-center p-4">
      <section className="flex justify-around gap-6 border-r border-gray-500">
        <div>
          <h2 className="mb-1 text-3xl font-bold">Hello, {username}!</h2>
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
        <AccountDate />
      </section>
    </div>
  );
}
