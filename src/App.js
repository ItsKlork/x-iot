import "./App.css";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { createBrowserHistory } from "history";
import { createContext, useContext, useEffect, useState } from "react";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Tenants from "./pages/tenants/Tenants";
import Cameras from "./pages/cameras/Cameras";
import Devices from "./pages/devices/Devices";
import DeviceMenu from "./pages/devices/DeviceMenu";
import SidebarOutlet from "./components/SidebarOutlet";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { WebSocketContext, WebSocketProvider } from "./components/WSContext";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import Logout from "./components/Logout";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const browserHistory = createBrowserHistory();

function ProtectedPage({ children }) {
  const auth = useContext(AuthContext);

  if (!auth.isAuthenticated) {
    return <Navigate to="/" />;
  }
  return children;
}

function App() {
  return (
    <WebSocketProvider>
      <AuthProvider>
        <HistoryRouter history={browserHistory}>
          <div style={{ fontFamily: "Heebo" }}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedPage>
                    <ThemeProvider theme={darkTheme}>
                      <SidebarOutlet />
                    </ThemeProvider>
                  </ProtectedPage>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="tenants" element={<Tenants />} />
                <Route path="cameras" element={<Cameras />} />
                <Route path="devices/:deviceId" element={<DeviceMenu />} />
                <Route path="devices" element={<Devices />} />
              </Route>
            </Routes>
          </div>
        </HistoryRouter>
      </AuthProvider>
    </WebSocketProvider>
  );
}

let AuthContext = createContext(null);

function AuthProvider({ children, wsp }) {
  const [username, setUsername] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [fullname, setFullname] = useState(null);
  const [error, setError] = useState(null);

  const { subscribe, send } = useContext(WebSocketContext);

  useEffect(() => {
    // Attempt to read from cookies

    subscribe("signout", (data) => {
      browserHistory.push("/");
    });

    subscribe("auth", (data) => {
      const response = JSON.parse(data);
      if (response.status === "success") {
        setIsAuthenticated(true);
        setUsername(response.username);
        setFullname(response.name);
        setError(null);
        browserHistory.push("/dashboard");
      } else {
        console.log(`Error: ${response.error}`);
        setIsAuthenticated(false);
        setUsername(null);
        setFullname(null);
        setError(response.error);
      }
    });
  }, [subscribe]);

  let signin = (username, password) => {
    console.log(`Signing in as ${username}`);
    send(JSON.stringify({ type: "auth", data: { username, password } }));
  };

  let signout = () => {
    console.log(`Signing out as ${username}`);
    send(JSON.stringify({ type: "signout" }));
  };

  let value = { username, fullname, isAuthenticated, error, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { App, AuthContext };
