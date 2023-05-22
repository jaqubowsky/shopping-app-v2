import { Link } from "react-router-dom";
import { PropsWithChildren} from "react";

function NavBar({ children }: PropsWithChildren) {

  return (
    <nav
      className="mx-auto flex w-11/12 items-center justify-around"
    >
      <div className="flex items-center gap-6">
        <Link className="flex text-5xl font-black" to=".">
          Fake <span className="text-white drop-shadow-md">Store</span>
        </Link>
      </div>
      <div className="hover flex flex-col items-center justify-center gap-6 text-lg">
        <section className="flex gap-6">{children}</section>
      </div>
    </nav>
  );
}

export default NavBar;
