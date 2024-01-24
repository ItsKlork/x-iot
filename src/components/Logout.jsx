import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authProvider } from "../auth";

function Logout(props) {
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      await authProvider.signout();
      navigate("/");
    })();
  }, [navigate]);

  return (
    <div
      style={{ height: "100vh", width: "100vw", backgroundColor: "black" }}
      className="d-flex align-items-center justify-content-center"
    >
      <h1 style={{ direction: "rtl" }}>מתנתק...</h1>
    </div>
  );
}

export default Logout;
