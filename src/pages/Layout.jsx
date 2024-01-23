import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Link to="/"></Link>
      <Link to="/detail"></Link>
      <Link to="/create"></Link>
      <Outlet />
    </>
  );
};

export default Layout;
