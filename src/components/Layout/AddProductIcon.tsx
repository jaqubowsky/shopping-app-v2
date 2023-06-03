import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";

function AddProductIcon() {
  const handleEnterPress = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === "Enter") {
      // Add product functionality
      e.stopPropagation();
    }
    return;
  };

  return (
    <Link
      to="/add-product"
      role="button"
      aria-label="add product"
      tabIndex={0}
      onKeyDown={handleEnterPress}
      className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-white p-4 text-center shadow-md"
    >
      <AiOutlinePlus className="text-3xl" />
    </Link>
  );
}

export default AddProductIcon;
