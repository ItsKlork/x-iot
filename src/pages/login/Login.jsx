import "../../css/login.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../App";
import Alert from "@mui/material/Alert";

function Login(props) {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const { error, signin } = useContext(AuthContext);

  async function loginToApp() {
    signin(username, password);
  }
  return (
    <div
      style={{ height: "100vh", width: "100vw", direction: "rtl" }}
      className="d-flex"
    >
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{
          height: "100vh",
          width: "50vw",
          background:
            "linear-gradient(180deg, rgba(16,109,205,1) 0%, rgba(163,7,222,1) 100%)",
        }}
      >
        <div className="m-5">
          <h1
            className="text-white"
            style={{ fontWeight: "700", fontSize: "3rem", margin: "0" }}
          >
            ברוכים הבאים
          </h1>
          <p
            className="text-white"
            style={{
              fontWeight: "200",
              fontSize: "2rem",
              margin: "0",
            }}
          >
            סיים את תהליך ההתחברות לקבלת גישה
          </p>
        </div>
      </div>
      <div
        className="d-flex flex-column align-items-center justify-content-center"
        style={{ width: "50vw" }}
      >
        <div className="d-flex flex-column">
          <p
            style={{ fontWeight: "800", fontSize: "1.75rem" }}
            className="text-dark"
          >
            התחבר
          </p>
          <input
            type="text"
            placeholder="שם משתמש"
            className="login-input"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="סיסמה"
            className="login-input"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            onClick={loginToApp}
            className="btn btn-dark shadow-lg m-2 mt-4 pt-2 pb-2"
            style={{
              border: 0,
              fontWeight: "700",
              background:
                "linear-gradient(97deg, rgba(16,109,205,1) 0%, rgba(163,7,222,1) 100%)",
            }}
          >
            התחבר
          </button>
        </div>
        {error && (
          <Alert severity="error" className="text-danger mt-4">
            {error}
          </Alert>
        )}
      </div>
    </div>
  );
}

export default Login;
