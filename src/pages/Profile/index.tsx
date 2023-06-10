import { Avatar } from "@material-tailwind/react";
import AccountDate from "./AccountDate";
import { useMutation } from "@tanstack/react-query";
import YouSureModal from "../../components/YouSureModal";
import { useState } from "react";
import { deleteAccount, signOut } from "../../api/userApi";
import { notify } from "../../components/PopUp/Notification";
import { getErrorMessage } from "../../utils/getErrorMessage";
import Spinner from "../../components/Spinner";
import { useUserContext } from "../../context/UserContext";


export default function Profile() {
  const { userData, refetch } = useUserContext();
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const { username, email, imageUrl, id } = userData?.user || {};

  const deleteMutation = useMutation(deleteAccount, {
    onSuccess: () => {
      notify({ message: "Account deleted successfully!", type: "success" });
      void signOut();
      void refetch();
    },
    onError: (err) => {
      notify({ message: getErrorMessage(err), type: "error" });
    },
  });

  const handleDeleteAccount = (userId: string) => {
    deleteMutation.mutate(userId);
  };

  if (deleteMutation.isLoading) return <Spinner />;

  return (
    <div className="mt-4 flex flex-col items-center justify-center md:flex-row md:gap-10">
      <section className="flex justify-around gap-6 border-b border-gray-500 border-b-gray-300 pb-2 md:border-b-0 md:border-r md:border-r-gray-300 md:pr-8">
        <div className="text-center">
          <Avatar
            className="cursor-pointer rounded-full object-cover"
            src={imageUrl}
            alt={username}
            size="xxl"
          />
          <h2 className="mb-1 mt-6 text-3xl font-bold">Hello, {username}!</h2>
          <h3 className="text-gray-600">{email}</h3>
          <button
            onClick={toggleModal}
            className="my-2 cursor-pointer font-bold text-yellow-800 drop-shadow-md hover:text-yellow-700"
          >
            Delete account
          </button>
        </div>
      </section>
      <section className="mt-4 p-2 text-center">
        <h2 className="mb-1 text-3xl">You have been with us:</h2>
        <AccountDate userData={userData} />
      </section>
      <YouSureModal
        showModal={showModal}
        toggleModal={toggleModal}
        closeModal={closeModal}
        handleChange={() =>
          handleDeleteAccount && handleDeleteAccount(id || "")
        }
      />
    </div>
  );
}
