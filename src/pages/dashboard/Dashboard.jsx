import React from "react";
import LatestUpdates from "./LatestUpdates";
import ActiveDevices from "../../components/ActiveDevices";

function Dashboard(props) {
  return (
    <div className="row">
      <div className="col" style={{ margin: "60px" }}>
        <LatestUpdates />
      </div>
      <div className="col" style={{ margin: "60px" }}>
        <ActiveDevices listLimit={5} showTitle />
      </div>
    </div>
  );
}

export default Dashboard;
