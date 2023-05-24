import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import CartModal from "../../pages/Cart/CartModal";
import UserIcon from "./UserIcon";
import UserOptionsModal from "../../pages/Login/UserOptionsModal";
import CartIcon from "./CartIcon";
import AddProductIcon from "./AddProductIcon";
import { UserResponse } from "../../types/user";

type LayoutProps = {
  userData: UserResponse | undefined;
}

export default function Layout({userData}: LayoutProps) {
  const [showCart, setShowCart] = useState(false);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [showNavBar, setShowNavBar] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      setShowNavBar(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const toggleLoginDropdown = () => {
    setShowLoginDropdown(!showLoginDropdown);
  };

  return (
    <>
      <header
        className={`fixed w-full bg-yellow-600 p-6 transition-all duration-300 z-50 ${
          showNavBar ? "top-0" : "-top-48"
        }`}
      >
        <NavBar>
          <CartIcon toggleCart={toggleCart} />
          <UserIcon toggleLoginDropdown={toggleLoginDropdown} userData={userData} />
          <AddProductIcon />
        </NavBar>
      </header>
      <main className="mx-auto p-2 my-48 flex w-11/12 items-center justify-center">
        <Outlet />
      </main>
      <UserOptionsModal
        userData={userData}
        toggleLoginDropdown={toggleLoginDropdown}
        showLoginDropdown={showLoginDropdown}
      />
      <CartModal toggleCart={toggleCart} showCart={showCart} />
    </>
  );
}
