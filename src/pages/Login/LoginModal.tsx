import ModalPortal from "../../components/Modal/ModalPortal";
import ModalWrapper from "../../components/Modal/ModalWrapper";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

type LoginModalProps = {
  toggleLoginDropdown: () => void;
  showLoginDropdown: boolean;
};

function LoginModal({
  toggleLoginDropdown,
  showLoginDropdown,
}: LoginModalProps) {
  return (
    <ModalPortal
      toggleModal={toggleLoginDropdown}
      showModal={showLoginDropdown}
    >
      <ModalWrapper handleCloseModal={toggleLoginDropdown}>
        <motion.div
          initial={{ x: 1000 }}
          animate={{ x: 0, transition: { duration: 0.5 } }}
          exit={{ x: 1000, transition: { duration: 0.5 } }}
          key="modal"
          className="absolute right-0 top-0 h-full bg-white p-10 text-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <ul className="flex flex-col gap-6">
            <NavLink onClick={toggleLoginDropdown} to="login">
              Login
            </NavLink>
            <NavLink to="profile">Profile</NavLink>
            <NavLink to="." onClick={toggleLoginDropdown}>
              Logout
            </NavLink>
          </ul>
        </motion.div>
      </ModalWrapper>
    </ModalPortal>
  );
}

export default LoginModal;
