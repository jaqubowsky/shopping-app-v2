import { Link } from "react-router-dom";
import { PropsWithChildren } from "react";
import BreadcrumbsComponent from "../Breadcrumbs";

function NavBar({ children }: PropsWithChildren) {
  const isMobile = window.screen.width < 600;

  return (
    <nav className="mx-auto flex w-11/12 flex-col items-center justify-around gap-2 md:flex-row">
      <div className="flex items-center gap-6 transition-all hover:scale-105">
        <Link className="flex text-5xl font-black text-gray-800" to="." replace>
          Fake <span className="text-white drop-shadow-md">Store</span>
        </Link>
      </div>
      {!isMobile && <BreadcrumbsComponent />}
      <div className="hover flex items-center justify-center gap-6 text-lg">
        <section className="flex gap-6">{children}</section>
      </div>
    </nav>
  );
}

export default NavBar;
