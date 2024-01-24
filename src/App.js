import "./App.css";
import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import { authProvider } from "./auth";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Logout from "./components/Logout";
import SidebarOutlet from "./components/SidebarOutlet";
import Tenants from "./pages/tenants/Tenants";
import Cameras from "./pages/cameras/Cameras";
import Devices from "./pages/devices/Devices";
import DeviceMenu from "./pages/devices/DeviceMenu";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import programNavigate from "./history";
import { useNavigate } from "react-router-dom";

const NavigateSetter = () => {
  programNavigate.navigate = useNavigate();

  return <Outlet />;
};

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    loader() {
      // Our root route always provides the user, if logged in
      return { user: authProvider.username };
    },
    Component: NavigateSetter,
    children: [
      {
        index: true,
        loader: loginLoader,
        Component: Login,
      },
      {
        path: "dashboard",
        loader: protectedLoader,
        Component: SidebarOutlet,
        children: [
          {
            index: true, // "/dashboard"
            Component: Dashboard,
          },
          {
            path: "tenants", // "/dashboard/tenants"
            Component: Tenants,
          },
          {
            path: "cameras", // "/dashboard/cameras"
            Component: Cameras,
          },
          {
            path: "devices/:deviceId", // "/dashboard/devices/:deviceId"
            Component: DeviceMenu,
          },
          {
            path: "devices", // "/dashboard/devices"
            Component: Devices,
          },
        ],
      },
    ],
  },
  {
    path: "/logout",
    Component: Logout,
  },
]);

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

async function loginLoader() {
  if (authProvider.isAuthenticated) {
    return redirect("/dashboard");
  }
  return null;
}

function protectedLoader({ request }) {
  // If the user is not logged in and tries to access `/protected`, we redirect
  // them to `/login` with a `from` parameter that allows login to redirect back
  // to this page upon successful authentication
  if (!authProvider.isAuthenticated) {
    console.log("Failed to authenticate");
    return redirect("/");
  }
  return null;
}

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <div style={{ fontFamily: "Heebo" }}>
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
}

export default App;
