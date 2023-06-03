import { BiUser } from "react-icons/bi";
import { UserResponse } from "../../types/user";

type UserIconProps = {
  toggleLoginDropdown: () => void;
  userData: UserResponse | undefined;
};

function UserIcon({ toggleLoginDropdown, userData }: UserIconProps) {
  const handleEnterPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      toggleLoginDropdown();
      e.stopPropagation();
    }
    return;
  };

  return (
    <div
      tabIndex={0}
      role="button"
      aria-label="user icon"
      onKeyDown={handleEnterPress}
      className="relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-white p-4 text-center shadow-md"
      onClick={(e) => {
        toggleLoginDropdown();
        e.stopPropagation();
      }}
    >
      {userData?.user ? (
        <img
          role="presentation"
          className="scale-150 rounded-full"
          src={userData.user.imageUrl}
          alt="user"
        />
      ) : (
        <BiUser className="text-3xl" />
      )}
    </div>
  );
}

export default UserIcon;
