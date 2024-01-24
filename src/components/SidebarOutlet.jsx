import { Outlet } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import CameraIcon from "@mui/icons-material/Camera";
import DevicesIcon from "@mui/icons-material/Devices";
import Sidebar from "./Sidebar";

function SidebarOutlet(props) {
  return (
    <div
      className="vh-100 vw-100 d-flex"
      style={{ backgroundColor: "#1B1C31", color: "white", direction: "rtl" }}
    >
      <Sidebar
        items={[
          {
            name: "דף ראשי",
            icon: DashboardIcon,
            path: "/dashboard",
          },
          {
            name: "דיירים",
            icon: GroupIcon,
            path: "/dashboard/tenants",
          },
          {
            name: "מצלמות",
            icon: CameraIcon,
            path: "/dashboard/cameras",
          },
          {
            name: "מכשירים",
            icon: DevicesIcon,
            path: "/dashboard/devices",
          },
        ]}
      />
      <div className="w-100">
        <Outlet />
      </div>
    </div>
  );
}

export default SidebarOutlet;
