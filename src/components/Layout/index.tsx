import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { useState } from "react";
import CartModal from "../../pages/Cart/CartModal";
import UserIcon from "../../pages/Login/UserIcon";
import UserOptionsModal from "../../pages/Login/UserOptionsModal";
import CartIcon from "../../pages/Cart/CartIcon";

type LayoutProps = {
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Layout({ setError, setClose, error }: LayoutProps) {
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
        </NavBar>
      </header>

      <main className="mx-auto my-6 flex w-11/12 items-center justify-center">
        <Outlet />
      </main>

      <UserOptionsModal
        toggleLoginDropdown={toggleLoginDropdown}
        showLoginDropdown={showLoginDropdown}
        error={error}
        setError={setError}
        setClose={setClose}
      />
      <CartModal toggleCart={toggleCart} showCart={showCart} />
    </>
  );
}
