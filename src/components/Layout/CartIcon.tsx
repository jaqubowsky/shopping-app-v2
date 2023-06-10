import { AiOutlineShoppingCart } from "react-icons/ai";
import useCartContext from "../../context/CartContext";
import { useUserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

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

  const { cartData } = useCartContext();
  const { userData } = useUserContext();
  const navigate = useNavigate();

  return (
    <div className="relative">
      <div
        onClick={userData?.isLoggedIn ? toggleCart : () => navigate("/login")}
        role="button"
        aria-label="cart icon"
        tabIndex={0}
        onKeyDown={handleEnterPress}
        className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-white p-4 text-center shadow-md"
      >
        <AiOutlineShoppingCart className="text-3xl" />
      </div>
      {cartData
        ? cartData.cartItems.length > 0 && (
            <div className="absolute -bottom-2 -left-1 rounded-full bg-yellow-900 px-2 text-gray-100 drop-shadow-xl">
              {cartData && cartData.cartItems.length}
            </div>
          )
        : null}
    </div>
  );
}

export default CartIcon;
