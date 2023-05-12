import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { useState } from "react";
import CartModal from "../../pages/Cart/CartModal";
import UserIcon from "./UserIcon";
import UserOptionsModal from "../../pages/Login/UserOptionsModal";
import CartIcon from "./CartIcon";
import AddProductIcon from "./AddProductIcon";

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
      <header className="bg-yellow-600 p-6">
        <NavBar>
          <CartIcon toggleCart={toggleCart} />
          <UserIcon toggleLoginDropdown={toggleLoginDropdown} />
          <AddProductIcon />
        </NavBar>
      </header>

      <main className="mx-auto my-6 flex w-11/12 items-center justify-center">
        <Outlet />
      </main>

      <UserOptionsModal
        toggleLoginDropdown={toggleLoginDropdown}
        showLoginDropdown={showLoginDropdown}
      />
      <CartModal toggleCart={toggleCart} showCart={showCart} />
    </>
  );
}
