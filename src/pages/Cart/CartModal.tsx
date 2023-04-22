import { motion } from "framer-motion";

type CartModalProps = {
  toggleCart: React.MouseEventHandler<HTMLButtonElement>;
};

export default function CartModal({ toggleCart }: CartModalProps) {
  return (
      <motion.div
        key="modal"
        initial={{ x: -1500 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
        exit={{ x: 1500 }}
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
  );
}
