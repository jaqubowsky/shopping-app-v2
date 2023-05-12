import { BiUser } from "react-icons/bi";
import useLoginStatus from "../../hooks/useLoginStatus";

type UserIconProps = {
  toggleLoginDropdown: () => void;
};

function UserIcon({ toggleLoginDropdown }: UserIconProps) {
  const { userData } = useLoginStatus();

  const user = userData?.user;

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
      className="relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-white p-4 text-center shadow-md"
      onClick={(e) => {
        toggleLoginDropdown();
        e.stopPropagation();
      }}
    >
      {user?.imageUrl ? (
        <img
          role="presentation"
          className="scale-150 rounded-full"
          src={user?.imageUrl}
          alt="user"
        />
      ) : (
        <BiUser className="text-3xl" />
      )}
    </div>
  );
}

export default UserIcon;
