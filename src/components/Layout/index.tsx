import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import CartModal from "../../pages/Cart/CartModal";
import UserIcon from "./UserIcon";
import UserOptionsModal from "../../pages/Auth/UserOptionsModal";
import CartIcon from "./CartIcon";
import AddProductIcon from "./AddProductIcon";

export default function Layout() {
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
        className={`fixed z-50 w-full bg-yellow-600 p-6 transition-all duration-300 ${
          showNavBar ? "top-0" : "-top-48"
        }`}
      >
        <NavBar>
          <CartIcon toggleCart={toggleCart} />
          <UserIcon
            toggleLoginDropdown={toggleLoginDropdown}
          />
          <AddProductIcon />
        </NavBar>
      </header>

      <main className="my-48 flex flex-col items-center justify-center md:my-32">
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
