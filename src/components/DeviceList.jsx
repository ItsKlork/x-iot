import { useContext, useEffect, useState } from "react";
import ActiveDeviceItem from "./ActiveDeviceItem";

import CameraIcon from "@mui/icons-material/Camera";
import DoorFrontIcon from "@mui/icons-material/DoorFront";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

import { useNavigate } from "react-router-dom";
import { WebSocketContext } from "./WSContext";
import { PacketTypes } from "../packetTypes";

const deviceIcons = {
  CAMERA: [CameraIcon, "#d2edfc"],
  DOOR_LOCK: [DoorFrontIcon, "#b38f6b"],
  LIGHT: [LightbulbIcon, "#fff491"],
  AIRCON: [AcUnitIcon, "#c7ffff"],
  WATER_HEATER: [LocalFireDepartmentIcon, "#fab3b1"],
};

function DeviceList(props) {
  const [devices, setDevices] = useState(null);
  const navigate = useNavigate();

  const { subscribe, send, unsubscribe } = useContext(WebSocketContext);

  useEffect(() => {
    subscribe(PacketTypes.GET_DEVICES_RESPONSE, (data) => {
      const response = JSON.parse(data);
      setDevices(response);
    });

    send(PacketTypes.GET_DEVICES, {});

    return () => {
      unsubscribe(PacketTypes.GET_DEVICES_RESPONSE);
    };
  }, [subscribe, send, unsubscribe]);

  const onlyActive = props.onlyActive || false;
  const filteredDevices = devices
    ? devices.filter((device) => !onlyActive || device.active)
    : devices;
  const devicesTextHebrew = onlyActive ? "מכשירים פעילים" : "מכשירים";

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
          <p style={{ fontSize: "1.7em", fontWeight: "700" }}>
            {devicesTextHebrew}
          </p>
        )}
        {!filteredDevices || filteredDevices.length === 0 ? (
          <p>
            {!filteredDevices
              ? `טוען ${devicesTextHebrew}...`
              : `אין ${devicesTextHebrew}`}
          </p>
        ) : (
          filteredDevices
            .filter((device) => !onlyActive || device.active)
            .slice(
              0,
              props.listLimit !== undefined
                ? props.listLimit
                : filteredDevices.length
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
          filteredDevices &&
          filteredDevices.length > props.listLimit && (
            <p
              className="me-3 mt-2"
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/dashboard/devices");
              }}
            >
              יש עוד {filteredDevices.length - props.listLimit}{" "}
              {devicesTextHebrew} נוספים
            </p>
          )}
      </div>
    </div>
  );
}

export default DeviceList;
