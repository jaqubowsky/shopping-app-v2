import ModalPortal from "../../components/Modal/ModalPortal";
import ModalWrapper from "../../components/Modal/ModalWrapper";
import { capitalizeFirst } from "../../utils/capitalize";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { logOut } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import { onPromise } from "../../utils/onPromise";

type UserOptionsModal = {
  toggleLoginDropdown: () => void;
  showLoginDropdown: boolean;
};

function UserOptionsModal({
  toggleLoginDropdown,
  showLoginDropdown,
}: UserOptionsModal) {
  const animationVariants = {
    initial: { x: 1000 },
    animate: { x: 0, transition: { duration: 0.5 } },
    exit: { x: 1000, transition: { duration: 0.5 } },
  };

  const [user] = useAuthState(auth);
  const userName = user?.displayName?.split(" ")[0];

  async function logOutUser() {
    await logOut();
    toggleLoginDropdown();
  }

  return (
    <ModalPortal
      toggleModal={toggleLoginDropdown}
      showModal={showLoginDropdown}
    >
      <ModalWrapper handleCloseModal={toggleLoginDropdown}>
        <motion.div
          variants={animationVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          key="modal"
          className="absolute right-0 top-0 h-full bg-white p-10 text-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {user && (
            <h1 className="mb-6">
              Hello{userName ? `, ${capitalizeFirst(userName)}` : ""}!
            </h1>
          )}
          <ul className="flex flex-col gap-6">
            {!user ? (
              <NavLink onClick={toggleLoginDropdown} to="login">
                Login
              </NavLink>
            ) : null}
            {!user ? (
              <NavLink onClick={toggleLoginDropdown} to="register">
                Register
              </NavLink>
            ) : null}
            {user ? (
              <NavLink onClick={toggleLoginDropdown} to="profile">
                Profile
              </NavLink>
            ) : null}
            {user ? (
              <NavLink to="." onClick={onPromise(logOutUser)}>
                Logout
              </NavLink>
            ) : null}
          </ul>
        </motion.div>
      </ModalWrapper>
    </ModalPortal>
  );
}

export default UserOptionsModal;
