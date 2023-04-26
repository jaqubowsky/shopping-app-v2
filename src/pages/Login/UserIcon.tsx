import { BiUser } from "react-icons/bi";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";

type UserIconProps = {
  toggleLoginDropdown: () => void;
};

function UserIcon({ toggleLoginDropdown }: UserIconProps) {
  const [user] = useAuthState(auth);
  const userPhoto = user?.photoURL;

  return (
    <div
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          toggleLoginDropdown();
          e.stopPropagation();
        }
        return;
      }}
      className="relative flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-white p-4 text-center shadow-md"
      onClick={(e) => {
        toggleLoginDropdown();
        e.stopPropagation();
      }}
    >
      {userPhoto ? (
        <img
          role="presentation"
          className="scale-105 rounded-full"
          src={userPhoto}
          alt="user"
        />
      ) : (
        <BiUser className="text-3xl" />
      )}
    </div>
  );
}

export default UserIcon;
