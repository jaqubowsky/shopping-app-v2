import ModalPortal from "../../components/Modal/ModalPortal";
import ModalWrapper from "../../components/Modal/ModalWrapper";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import { useErrorBoundary } from "react-error-boundary";
import { signOut } from "../../api/userApi";
import { onPromise } from "../../utils/onPromise";
import useLoginStatus from "../../hooks/useLoginStatus";

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

  const { showBoundary } = useErrorBoundary();

  const { userData } = useLoginStatus();

  const isLoggedIn = userData?.user === null ? false : true;

  const navigate = useNavigate();

  async function logOutUser() {
    try {
      await signOut();
      navigate(0);
    } catch (err) {
      showBoundary(err);
    } finally {
      toggleLoginDropdown();
    }
  }

  return (
    <>
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
            {isLoggedIn ? (
              <h1 className="mb-6">Hello {userData?.user.username}!</h1>
            ) : null}
            <ul className="flex flex-col gap-6">
              {!isLoggedIn ? (
                <NavLink onClick={toggleLoginDropdown} to="login">
                  Login
                </NavLink>
              ) : null}
              {!isLoggedIn ? (
                <NavLink onClick={toggleLoginDropdown} to="register">
                  Register
                </NavLink>
              ) : null}
              {isLoggedIn ? (
                <NavLink onClick={toggleLoginDropdown} to="profile">
                  Profile
                </NavLink>
              ) : null}
              {isLoggedIn ? (
                <NavLink onClick={toggleLoginDropdown} to="profile/my-products">
                  My Products
                </NavLink>
              ) : null}
              {isLoggedIn ? (
                <NavLink to="." onClick={onPromise(logOutUser)}>
                  Logout
                </NavLink>
              ) : null}
            </ul>
          </motion.div>
        </ModalWrapper>
      </ModalPortal>
    </>
  );
}

export default UserOptionsModal;
