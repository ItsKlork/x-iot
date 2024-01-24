import { useLocation, useNavigate } from "react-router-dom";
import { authProvider } from "../auth";
import SidebarItem from "./SidebarItem";

function Sidebar({ items }) {
  const navigate = useNavigate();
  const location = useLocation();

  function signout() {
    navigate("/logout");
  }

  return (
    <div
      className="vh-100 d-flex flex-column"
      style={{ width: "250px", backgroundColor: "#222338" }}
    >
      <div
        className="w-100 d-flex align-items-center justify-content-center"
        style={{ height: "100px" }}
      >
        {/* Logo */}
        <p className="m-0" style={{ fontSize: "2em", fontWeight: "800" }}>
          xIOT
        </p>
      </div>
      <div className="d-flex m-3 mt-0 flex-column">
        {/* Sidebar Items */}
        {items.map((item) => (
          <SidebarItem
            name={item.name}
            icon={item.icon}
            path={item.path}
            active={location.pathname === item.path}
            key={item.name}
          />
        ))}
      </div>

      <div className="mt-auto m-4" style={{ fontSize: "1.2em" }}>
        <p className="m-0">{authProvider.name}</p>
        <p
          className="m-0 mt-1"
          style={{ cursor: "pointer", fontWeight: "600" }}
          onClick={signout}
        >
          התנתק
        </p>
      </div>
    </div>
  );
}

export default Sidebar;
