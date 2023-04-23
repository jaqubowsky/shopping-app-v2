import { NavLink, Link } from "react-router-dom";
import { PropsWithChildren } from "react";

function NavBar({ children }: PropsWithChildren) {
  const getActiveStyles = (isActive: boolean) => {
    return isActive
      ? "scale-105 border-b-2 border-b-white"
      : "flex items-center justify-center gap-6 text-lg hover:scale-105 hover:border-b-2 hover:border-b-white";
  };

  return (
    <nav className="mx-auto flex w-11/12 flex-col items-center justify-between">
      <Link className="mb-4 text-6xl font-black" to=".">
        Fake<span className="text-white drop-shadow-md">Store</span>
      </Link>
      <div className="hover flex flex-col items-center justify-center gap-6 text-lg">
        <section className="flex gap-6">
          <NavLink
            className={({ isActive }) => getActiveStyles(isActive)}
            to="/"
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

        <section className="flex gap-6">{children}</section>
      </div>
    </nav>
  );
}

export default NavBar;
