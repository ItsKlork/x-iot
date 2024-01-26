import { useEffect, useContext } from "react";
import { AuthContext } from "../App";

function Logout(props) {
  const auth = useContext(AuthContext);
  useEffect(() => {
    auth.signout();
  }, [auth]);

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
