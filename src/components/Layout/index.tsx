import { Outlet } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useState } from "react";
import ModalPortal from "../Modal/ModalPortal";
import CartModal from "../../pages/Cart/CartModal";
import ModalWrapper from "../Modal/ModalWrapper";

export default function Layout() {
  const [showCart, setShowCart] = useState(false);

  const toggleCart = () => {
    setShowCart((prevState) => !prevState);
  };

  return (
    <>
      <header className="bg-yellow-400 p-6">
        <nav className="mx-auto flex w-11/12 flex-col items-center justify-between">
          <Link className="mb-4 text-6xl font-black" to=".">
            Fake<span className="text-white drop-shadow-md">Store</span>
          </Link>
          <div className="hover flex items-center justify-center gap-6 text-lg">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "scale-105 border-b-2 border-b-white"
                  : "flex items-center justify-center gap-6 text-lg hover:scale-105 hover:border-b-2 hover:border-b-white"
              }
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "scale-105 border-b-2 border-b-white"
                  : "flex items-center justify-center gap-6 text-lg hover:scale-105 hover:border-b-2 hover:border-b-white"
              }
              to="products"
            >
              Products
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "scale-105 border-b-2 border-b-white"
                  : "flex items-center justify-center gap-6 text-lg hover:scale-105 hover:border-b-2 hover:border-b-white"
              }
              to="contact"
            >
              Contact
            </NavLink>
            <div onClick={toggleCart}>
              <div className="cursor-pointer rounded-full bg-white p-4 text-center shadow-md">
                <AiOutlineShoppingCart className="text-3xl" />
              </div>
            </div>
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
    </>
  );
}
