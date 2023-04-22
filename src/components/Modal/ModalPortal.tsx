import { createPortal } from "react-dom";
import { AnimatePresence } from "framer-motion";
import { PropsWithChildren } from "react";

type ModalPortalProps = {
  toggleModal: React.MouseEventHandler<HTMLDivElement>;
  showModal: boolean;
};

export default function ModalPortal({
  showModal,
  children,
}: PropsWithChildren<ModalPortalProps>) {
  return createPortal(
    <AnimatePresence>{showModal && children}</AnimatePresence>,
    document.body
  );
}
