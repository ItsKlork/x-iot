import React from "react";
import LatestUpdates from "./LatestUpdates";
import DeviceList from "../../components/DeviceList";

function Dashboard(props) {
  return (
    <div className="row">
      <div className="col" style={{ margin: "60px" }}>
        <LatestUpdates />
      </div>
      <div className="col" style={{ margin: "60px" }}>
        <DeviceList listLimit={5} showTitle onlyActive />
      </div>
    </div>
  );
}

export default Dashboard;
