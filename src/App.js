import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
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
import { PacketTypes } from "./packetTypes";
import NotificationOutlet from "./components/NotificationOutlet";
import constants from "./constants";

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
                      <NotificationOutlet>
                        <SidebarOutlet />
                      </NotificationOutlet>
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

  const { subscribe, send, unsubscribe } = useContext(WebSocketContext);

  useEffect(() => {
    // Attempt to read from cookies
    setTimeout(() => {
      const tokenCookie = localStorage.getItem("token");
      if (tokenCookie) {
        console.log("Found token in cookie, attempting to authenticate");
        send(PacketTypes.WEB_AUTH_TOKEN, { token: tokenCookie });
      }
    }, constants.RECONNECTION_WAIT_TIME);

    subscribe(PacketTypes.WEB_AUTH_SIGN_OUT_RESPONSE, (data) => {
      browserHistory.push("/");
    });

    subscribe(PacketTypes.WEB_AUTH_TOKEN_RESPONSE, (data) => {
      const response = JSON.parse(data);
      console.log("Token response", response);
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
        localStorage.removeItem("token");
      }
    });

    subscribe(PacketTypes.WEB_AUTHENTICATION_RESPONSE, (data) => {
      const response = JSON.parse(data);
      console.log("Authentication response", response);
      if (response.status === "success") {
        localStorage.setItem("token", response.token);
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

    return () => {
      unsubscribe(PacketTypes.WEB_AUTH_SIGN_OUT_RESPONSE);
      unsubscribe(PacketTypes.WEB_AUTHENTICATION_RESPONSE);
      unsubscribe(PacketTypes.WEB_AUTH_TOKEN_RESPONSE);
    };
  }, [subscribe, unsubscribe, send]);

  let signin = (username, password) => {
    console.log(`Signing in as ${username}`);
    send(PacketTypes.WEB_AUTHENTICATION, { username, password });
  };

  let signout = () => {
    console.log(`Signing out as ${username}`);
    send(PacketTypes.WEB_AUTH_SIGN_OUT, {});
    localStorage.removeItem("token");
  };

  let value = { username, fullname, isAuthenticated, error, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { App, AuthContext };
