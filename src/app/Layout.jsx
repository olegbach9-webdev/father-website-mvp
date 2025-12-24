import { NavLink, Outlet } from "react-router-dom";

function Nav() {
  const link = ({ isActive }) =>
    "link" + (isActive ? " active" : "");

  return (
    <div className="nav">
      <div className="brand">Oleg Skrynyk</div>
      <div className="links">
        <NavLink to="/" end className={link}>Home</NavLink>
        <NavLink to="/research" className={link}>Research</NavLink>
        <NavLink to="/publications" className={link}>Publications</NavLink>
        <NavLink to="/team" className={link}>Team</NavLink>
      </div>
    </div>
  );
}

export default function Layout() {
  return (
    <div className="container">
      <Nav />
      <Outlet />
    </div>
  );
}
