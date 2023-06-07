import { motion } from "framer-motion";
import ModalPortal from "../../components/Modal/ModalPortal";
import ModalWrapper from "../../components/Modal/ModalWrapper";
import { removeFromCart } from "../../api/cartApi";
import { notify } from "../../components/PopUp/Notification";
import { getErrorMessage } from "../../utils/getErrorMessage";
import useCartContext from "../../context/CartContext";
import { useMutation } from "@tanstack/react-query";

type CartModalProps = {
  toggleCart: () => void;
  showCart: boolean;
};

export default function CartModal({ toggleCart, showCart }: CartModalProps) {
  const animationVariants = {
    initial: { x: -1500 },
    animate: { x: 0, transition: { duration: 0.3 } },
    exit: { x: 1500, transition: { duration: 0.3 } },
  };

  const { cartData, refetchCart } = useCartContext();

  const removeMutation = useMutation(removeFromCart, {
    onSuccess: () => {
      refetchCart()
        .then(() => {
          notify({ type: "success", message: "Product removed from cart!" });
        })
        .catch((err) =>
          notify({ type: "error", message: getErrorMessage(err) })
        );
    },
  });

  const handleRemove = (cartItemId: string) => {
    removeMutation.mutate(cartItemId);
  };

  const cartItems = cartData?.cartItems;

  const cartItemsEl = cartItems?.map((cartItem) => {
    return (
      <div
        className="mb-4 flex w-full items-center justify-between"
        key={cartItem.product.id}
      >
        <div className="flex items-center">
          <img
            className="h-16 w-16 rounded-lg object-cover"
            src={cartItem.product.imageUrl}
            alt={cartItem.product.name}
          />
          <div className="ml-4">
            <h1 className="text-lg font-bold">{cartItem.product.name}</h1>
            <p className="text-sm text-gray-500">{cartItem.product.category}</p>
          </div>
        </div>
        <div className="flex items-center">
          <p className="mr-4 text-lg font-bold">{cartItem.product.price}€</p>
          <button
            className="text-lg font-bold text-red-700 hover:text-red-500"
            onClick={() => handleRemove(cartItem.id)}
          >
            Remove
          </button>
        </div>
      </div>
    );
  });

  return (
    <ModalPortal toggleModal={toggleCart} showModal={showCart}>
      <ModalWrapper handleCloseModal={toggleCart}>
        <motion.div
          key="modal"
          variants={animationVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
          className="flex-col items-center rounded-lg bg-white p-6 text-center shadow-lg"
        >
          <h1 className="mb-10 text-5xl font-black">Shopping cart</h1>
          {cartItemsEl}
          {cartItems
            ? cartItems.length > 0 && (
                <button className="my-2 w-full rounded-lg bg-green-500 py-3 text-lg text-white shadow-lg hover:bg-green-400">
                  Continue
                </button>
              )
            : null}
          <button
            className="my-2 w-full rounded-lg bg-red-500 py-3 text-lg text-white shadow-lg hover:bg-red-400"
            onClick={toggleCart}
          >
            Close
          </button>
        </motion.div>
      </ModalWrapper>
    </ModalPortal>
  );
}
