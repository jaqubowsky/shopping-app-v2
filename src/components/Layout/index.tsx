import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { useState } from "react";
import CartModal from "../../pages/Cart/CartModal";
import UserIcon from "../../pages/Login/UserIcon";
import LoginModal from "../../pages/Login/LoginModal";
import CartIcon from "../../pages/Cart/CartIcon";

export default function Layout() {
  const [showCart, setShowCart] = useState(false);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);

  const toggleCart = () => {
    setShowCart((prevState) => !prevState);
  };

  const toggleLoginDropdown = () => {
    setShowLoginDropdown((prevState) => !prevState);
  };

  return (
    <>
      <header className="bg-yellow-400 p-6">
        <NavBar>
          <CartIcon toggleCart={toggleCart} />
          <UserIcon toggleLoginDropdown={toggleLoginDropdown} />
        </NavBar>
      </header>

      <main className="mx-auto my-6 flex w-11/12 items-center justify-center">
        <Outlet />
      </main>

      <LoginModal
        toggleLoginDropdown={toggleLoginDropdown}
        showLoginDropdown={showLoginDropdown}
      />
      <CartModal toggleCart={toggleCart} showCart={showCart} />
    </>
  );
}
