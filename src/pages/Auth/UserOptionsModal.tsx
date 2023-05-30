import ModalPortal from "../../components/Modal/ModalPortal";
import ModalWrapper from "../../components/Modal/ModalWrapper";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { onPromise } from "../../utils/onPromise";
import { UserResponse } from "../../types/user";
import { notify } from "../../components/PopUp/Notification";
import { useMutation } from "@tanstack/react-query";
import useUserContext from "../../context/UserContext";
import { signOut } from "../../api/userApi";
import { getErrorMessage } from "../../utils/getErrorMessage";

type UserOptionsModal = {
  toggleLoginDropdown: () => void;
  showLoginDropdown: boolean;
  userData: UserResponse | undefined;
};

function UserOptionsModal({
  toggleLoginDropdown,
  showLoginDropdown,
  userData,
}: UserOptionsModal) {
  const animationVariants = {
    initial: { x: 1000 },
    animate: { x: 0, transition: { duration: 0.5 } },
    exit: { x: 1000, transition: { duration: 0.5 } },
  };

  const { isLoggedIn, refetch } = useUserContext();

  const logOutMutation = useMutation(signOut, {
    onSuccess: () => {
      refetch()
        .then(() => {
          notify({ message: "Logged out successfully!", type: "success" });
        })
        .catch(() => {
          notify({
            message: "Something went wrong while logging out!",
            type: "error",
          });
        });
    },
  });

  const handleLogOut = async () => {
    await logOutMutation.mutateAsync();
  };

  async function logOutUser() {
    try {
      await handleLogOut();
    } catch (err) {
      notify({ message: getErrorMessage(err), type: "error" });
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
              <h1 className="mb-6 text-2xl font-bold">
                Hello, {userData?.user.username}!
              </h1>
            ) : null}
            <ul className="flex flex-col gap-6">
              {!isLoggedIn ? (
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "text-yellow-800"
                      : "hover:scale-105 hover:text-yellow-800"
                  }
                  onClick={toggleLoginDropdown}
                  to="login"
                >
                  Login
                </NavLink>
              ) : null}
              {!isLoggedIn ? (
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "text-yellow-800"
                      : "hover:scale-105  hover:text-yellow-800"
                  }
                  onClick={toggleLoginDropdown}
                  to="register"
                >
                  Register
                </NavLink>
              ) : null}
              {isLoggedIn ? (
                <NavLink
                  end
                  className={({ isActive }) =>
                    isActive
                      ? "text-yellow-800"
                      : "hover:scale-105  hover:text-yellow-800"
                  }
                  onClick={toggleLoginDropdown}
                  to="profile"
                >
                  Profile
                </NavLink>
              ) : null}
              {isLoggedIn ? (
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "text-yellow-800"
                      : "hover:scale-105  hover:text-yellow-800"
                  }
                  onClick={toggleLoginDropdown}
                  to="profile/my-products"
                >
                  My Products
                </NavLink>
              ) : null}
              {isLoggedIn ? (
                <NavLink
                  className="hover:scale-105 hover:text-red-900"
                  to="."
                  onClick={onPromise(logOutUser)}
                >
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
