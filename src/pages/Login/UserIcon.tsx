import { BiUser } from "react-icons/bi";

type UserIconProps = {
  toggleLoginDropdown: () => void;
};

function UserIcon({
  toggleLoginDropdown,
}: UserIconProps) {
  return (
    <div
      className="relative cursor-pointer rounded-full bg-white p-4 text-center shadow-md"
      onClick={(e) => {
        toggleLoginDropdown();
        e.stopPropagation();
      }}
    >
      <BiUser className="text-3xl" />
    </div>
  );
}

export default UserIcon;