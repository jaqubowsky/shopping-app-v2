import { AiOutlineShoppingCart } from "react-icons/ai";

type CartIconProps = {
  toggleCart: () => void;
};

function CartIcon({ toggleCart }: CartIconProps) {
  const handleEnterPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      toggleCart();
      e.stopPropagation();
    }
    return;
  };

  return (
    <div
      onClick={toggleCart}
      role="button"
      tabIndex={0}
      onKeyDown={handleEnterPress}
      className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-white p-4 text-center shadow-md"
    >
      <AiOutlineShoppingCart className="text-3xl" />
    </div>
  );
}

export default CartIcon;
