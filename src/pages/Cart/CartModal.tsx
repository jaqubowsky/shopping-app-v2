import { motion } from "framer-motion";
import ModalPortal from "../../components/Modal/ModalPortal";
import ModalWrapper from "../../components/Modal/ModalWrapper";

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
          <button
            className="w-full rounded-lg bg-red-700 py-3 text-lg text-white shadow-lg hover:bg-red-600"
            onClick={toggleCart}
          >
            Close
          </button>
        </motion.div>
      </ModalWrapper>
    </ModalPortal>
  );
}
