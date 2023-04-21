import { Outlet } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <header>
        <div>
          <Link to=".">FakeStore</Link>
          <NavLink to="/">Home</NavLink>
          <NavLink to="products">Products</NavLink>
        </div>
      </header>
      <Outlet />
    </>
  );
}
