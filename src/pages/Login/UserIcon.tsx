import { BiUser } from "react-icons/bi";
import useLoginStatus from "../../hooks/useLoginStatus";

type UserIconProps = {
  toggleLoginDropdown: () => void;
};

function UserIcon({ toggleLoginDropdown }: UserIconProps) {
  const { user } = useLoginStatus();
  console.log(user)

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
      onKeyDown={handleEnterPress}
      className="relative flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-white p-4 text-center shadow-md"
      onClick={(e) => {
        toggleLoginDropdown();
        e.stopPropagation();
      }}
    >
      {user?.picture ? (
        <img
          role="presentation"
          className="scale-105 rounded-full"
          src={user.picture}
          alt="user"
        />
      ) : (
        <BiUser className="text-3xl" />
      )}
    </div>
  );
}

export default UserIcon;
