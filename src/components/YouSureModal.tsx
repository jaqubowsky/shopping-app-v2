import ModalPortal from "./Modal/ModalPortal";
import ModalWrapper from "./Modal/ModalWrapper";
import { motion } from "framer-motion";

type ModalPortalProps = {
  showModal: boolean;
  toggleModal: () => void;
  closeModal: () => void;
  handleChange?: () => void;
};

export default function YouSureModal({
  showModal,
  toggleModal,
  closeModal,
  handleChange,
}: ModalPortalProps) {
  return (
    <ModalPortal showModal={showModal} toggleModal={toggleModal}>
      <ModalWrapper handleCloseModal={closeModal}>
        <motion.div className="flex flex-col items-center justify-center rounded-sm bg-white p-6">
          <h2 className="text-2xl font-bold">Are you sure?</h2>
          <p className="text-gray-600">This action cannot be undone.</p>
          <div className="mt-4 flex gap-4">
            <button
              onClick={handleChange}
              className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-400"
            >
              Delete
            </button>
            <button
              onClick={closeModal}
              className="rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </ModalWrapper>
    </ModalPortal>
  );
}
