import { useEffect, useState } from "react";
import ActiveDeviceItem from "./ActiveDeviceItem";

import CameraIcon from "@mui/icons-material/Camera";
import DoorFrontIcon from "@mui/icons-material/DoorFront";
import { useNavigate } from "react-router-dom";

function ActiveDevices(props) {
  const [activeDevices, setActiveDevices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await new Promise((r) => setTimeout(r, 1000));
      setActiveDevices([
        {
          deviceName: "מצלמה 1",
          deviceType: "camera",
          uuid: "e3849810-f41d-41e3-9447-336e1905b936",
          icon: CameraIcon,
          iconColor: "#d2edfc",
        },
        {
          deviceName: "מצלמה 2",
          deviceType: "camera",
          uuid: "06c64f00-8cc4-4510-aa22-928b0d001f5a",
          icon: CameraIcon,
          iconColor: "#d2edfc",
        },
        {
          deviceName: "דלת כניסה",
          deviceType: "door",
          uuid: "5a9ae3e9-84b4-4c37-88a2-bfee5db44654",
          icon: DoorFrontIcon,
          iconColor: "#b38f6b",
        },
        {
          deviceName: "דלת כניסה",
          deviceType: "door",
          uuid: "466799f8-0d84-4c8a-b5f2-283f5bd89dbe",
          icon: DoorFrontIcon,
          iconColor: "#b38f6b",
        },
        {
          deviceName: "מצלמה 1",
          deviceType: "camera",
          uuid: "933283cb-c0c0-4739-aaa0-0d4321469b32",
          icon: CameraIcon,
          iconColor: "#d2edfc",
        },
        {
          deviceName: "מצלמה 2",
          deviceType: "camera",
          uuid: "c923e9bc-e20a-4eea-8c43-f2e7b884d255",
          icon: CameraIcon,
          iconColor: "#d2edfc",
        },
        {
          deviceName: "דלת כניסה",
          deviceType: "door",
          uuid: "e4473eb1-09a3-40ea-8f94-d4246b579bf7",
          icon: DoorFrontIcon,
          iconColor: "#b38f6b",
        },
        {
          deviceName: "דלת כניסה",
          deviceType: "door",
          uuid: "54b3a0a4-bf78-49c8-98d1-d7d5df36cd17",
          icon: DoorFrontIcon,
          iconColor: "#b38f6b",
        },
        {
          deviceName: "מצלמה 1",
          deviceType: "camera",
          uuid: "9af01b53-80ea-4223-9d21-19439da2b3c9",
          icon: CameraIcon,
          iconColor: "#d2edfc",
        },
        {
          deviceName: "מצלמה 2",
          deviceType: "camera",
          uuid: "c6bf9bf8-8c5d-451c-ae8f-a611c45969bd",
          icon: CameraIcon,
          iconColor: "#d2edfc",
        },
        {
          deviceName: "דלת כניסה",
          deviceType: "door",
          uuid: "3a846e59-f686-4464-8a99-12ce54514712",
          icon: DoorFrontIcon,
          iconColor: "#b38f6b",
        },
        {
          deviceName: "דלת כניסה",
          deviceType: "door",
          uuid: "06284f60-230f-49c0-9281-50a97a2f4281",
          icon: DoorFrontIcon,
          iconColor: "#b38f6b",
        },
        {
          deviceName: "מצלמה 1",
          deviceType: "camera",
          uuid: "82308ba1-9e22-44b6-9323-cde29b7dd5bf",
          icon: CameraIcon,
          iconColor: "#d2edfc",
        },
        {
          deviceName: "מצלמה 2",
          deviceType: "camera",
          uuid: "63834360-a8d2-4581-aaa6-ded594a24b8f",
          icon: CameraIcon,
          iconColor: "#d2edfc",
        },
        {
          deviceName: "דלת כניסה",
          deviceType: "door",
          uuid: "36e1fe7d-1de7-4aaf-b345-8ab52fc5a20c",
          icon: DoorFrontIcon,
          iconColor: "#b38f6b",
        },
        {
          deviceName: "דלת כניסה",
          deviceType: "door",
          uuid: "355ed91d-4621-4928-9f23-1768745112f9",
          icon: DoorFrontIcon,
          iconColor: "#b38f6b",
        },
        {
          deviceName: "מצלמה 1",
          deviceType: "camera",
          uuid: "00176984-65c7-4037-9af8-a31289c7041f",
          icon: CameraIcon,
          iconColor: "#d2edfc",
        },
        {
          deviceName: "מצלמה 2",
          deviceType: "camera",
          uuid: "55260ed9-a73f-47f6-86b1-cc3df8942ace",
          icon: CameraIcon,
          iconColor: "#d2edfc",
        },
        {
          deviceName: "דלת כניסה",
          deviceType: "door",
          uuid: "8897349b-6756-4745-b11d-56691ec02675",
          icon: DoorFrontIcon,
          iconColor: "#b38f6b",
        },
        {
          deviceName: "דלת כניסה",
          deviceType: "door",
          uuid: "ca2495c3-d6bf-4cac-926e-ee1e756f8876",
          icon: DoorFrontIcon,
          iconColor: "#b38f6b",
        },
      ]);
    })();
  }, []);

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
        {activeDevices.length === 0 ? (
          <p>אין מכשירים פעילים</p>
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
                icon={device.icon}
                iconColor={device.iconColor}
                deviceName={device.deviceName}
                key={device.uuid}
                uuid={device.uuid}
                {...(props.seperator && { seperator: true })}
              />
            ))
        )}
        {props.listLimit !== undefined &&
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
