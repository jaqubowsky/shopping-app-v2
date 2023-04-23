import { AiOutlineShoppingCart } from "react-icons/ai";

type CartIconProps = {
  toggleCart: () => void;
};

function CartIcon({ toggleCart }: CartIconProps) {
  return (
    <div onClick={toggleCart}>
      <div className="cursor-pointer rounded-full bg-white p-4 text-center shadow-md">
        <AiOutlineShoppingCart className="text-3xl" />
      </div>
    </div>
  );
}

export default CartIcon;