import { useContext, useEffect, useState } from "react";
import ActiveDeviceItem from "./ActiveDeviceItem";

import CameraIcon from "@mui/icons-material/Camera";
import DoorFrontIcon from "@mui/icons-material/DoorFront";
import { useNavigate } from "react-router-dom";
import { WebSocketContext } from "./WSContext";

const deviceIcons = {
  CAMERA: [CameraIcon, "#d2edfc"],
  DOOR_LOCK: [DoorFrontIcon, "#b38f6b"],
  LIGHTS: [CameraIcon, "#fcfcfc"],
  AIR_CONDITIONER: [CameraIcon, "#fcfcfc"],
};

function ActiveDevices(props) {
  const [activeDevices, setActiveDevices] = useState(null);
  const navigate = useNavigate();

  const { subscribe, send } = useContext(WebSocketContext);

  useEffect(() => {
    subscribe("devices", (data) => {
      const response = JSON.parse(data);
      console.log(response);
      setActiveDevices(response);
    });

    send(
      JSON.stringify({
        type: "module",
        module_uuid: "41747d8e-a73d-4087-b0d6-fe680cc31c00",
        data: { action: "get_devices" },
      })
    );
  }, [subscribe, send]);

  return (
    <div
      className="d-flex flex-column"
      style={{
        width: "500px",
        height: "75vh",
        overflowY: "auto",
        direction: "ltr",
      }}
    >
      <div style={{ direction: "rtl", marginRight: "20px" }}>
        {props.showTitle && (
          <p style={{ fontSize: "1.7em", fontWeight: "700" }}>מכשירים פעילים</p>
        )}
        {!activeDevices || activeDevices.length === 0 ? (
          <p>{!activeDevices ? "טוען מכשירים..." : "אין מכשירים פעילים"}</p>
        ) : (
          activeDevices
            .slice(
              0,
              props.listLimit !== undefined
                ? props.listLimit
                : activeDevices.length
            )
            .map((device) => (
              <ActiveDeviceItem
                icon={deviceIcons[device.deviceType][0]}
                iconColor={deviceIcons[device.deviceType][1]}
                deviceName={device.name}
                key={device.deviceUUID}
                uuid={device.deviceUUID}
                {...(props.seperator && { seperator: true })}
              />
            ))
        )}
        {props.listLimit !== undefined &&
          activeDevices &&
          activeDevices.length > props.listLimit && (
            <p
              className="me-3 mt-2"
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/dashboard/devices");
              }}
            >
              יש עוד {activeDevices.length - props.listLimit} מכשירים נוספים
            </p>
          )}
      </div>
    </div>
  );
}

export default ActiveDevices;
