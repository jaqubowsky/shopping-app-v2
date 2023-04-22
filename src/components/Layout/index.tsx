import { Outlet } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { useState } from "react";
import ModalPortal from "../Modal/ModalPortal";
import CartModal from "../../pages/Cart/CartModal";
import ModalWrapper from "../Modal/ModalWrapper";
import { AnimatePresence, motion } from "framer-motion";

export default function Layout() {
  const [showCart, setShowCart] = useState(false);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);

  const toggleCart = () => {
    setShowCart((prevState) => !prevState);
  };

  const toggleLoginDropdown = () => {
    setShowLoginDropdown((prevState) => !prevState);
  };

  console.log(showLoginDropdown);

  const getActiveStyles = (isActive: boolean) => {
    return isActive
      ? "scale-105 border-b-2 border-b-white"
      : "flex items-center justify-center gap-6 text-lg hover:scale-105 hover:border-b-2 hover:border-b-white";
  };

  return (
    <div onClick={() => setShowLoginDropdown(false)} className="h-full w-full">
      <header className="bg-yellow-400 p-6">
        <nav className="mx-auto flex w-11/12 flex-col items-center justify-between">
          <Link className="mb-4 text-6xl font-black" to=".">
            Fake<span className="text-white drop-shadow-md">Store</span>
          </Link>
          <div className="hover flex flex-col items-center justify-center gap-6 text-lg">
            <section className="flex gap-6">
              <NavLink
                to="/"
                className={({ isActive }) => getActiveStyles(isActive)}
              >
                Home
              </NavLink>
              <NavLink
                className={({ isActive }) => getActiveStyles(isActive)}
                to="products"
              >
                Products
              </NavLink>
              <NavLink
                className={({ isActive }) => getActiveStyles(isActive)}
                to="contact"
              >
                Contact
              </NavLink>
            </section>
            <section className="flex gap-6">
              <div onClick={toggleCart}>
                <div className="cursor-pointer rounded-full bg-white p-4 text-center shadow-md">
                  <AiOutlineShoppingCart className="text-3xl" />
                </div>
              </div>
              <div>
                <div
                  className="relative cursor-pointer rounded-full bg-white p-4 text-center shadow-md"
                  onClick={(e) => {
                    toggleLoginDropdown();
                    e.stopPropagation();
                  }}
                >
                  <BiUser className="text-3xl" />

                  <ModalPortal
                    toggleModal={toggleLoginDropdown}
                    showModal={showLoginDropdown}
                  >
                    <ModalWrapper
                      handleCloseModal={() => setShowLoginDropdown(false)}
                    >
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
                </div>
              </div>
            </section>
          </div>
        </nav>
      </header>
      <main className="mx-auto my-6 flex w-11/12 items-center justify-center">
        <Outlet />
        <ModalPortal toggleModal={toggleCart} showModal={showCart}>
          <ModalWrapper handleCloseModal={toggleCart}>
            <CartModal toggleCart={toggleCart} />
          </ModalWrapper>
        </ModalPortal>
      </main>
    </div>
  );
}
