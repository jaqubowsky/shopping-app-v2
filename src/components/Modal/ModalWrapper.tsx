import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

type ModalWrapperProps = {
  handleCloseModal: React.MouseEventHandler<HTMLDivElement>;
};

function ModalWrapper({
  children,
  handleCloseModal,
}: PropsWithChildren<ModalWrapperProps>) {
  return (
    <motion.div
      id="modal"
      key="modal"
      onClick={handleCloseModal}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black-opacity"
    >
      {children}
    </motion.div>
  );
}

export default ModalWrapper;
