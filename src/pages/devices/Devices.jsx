import { IconButton } from "@mui/material";
import DeviceList from "../../components/DeviceList";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useContext, useEffect, useState } from "react";
import { WebSocketContext } from "../../components/WSContext";
import { PacketTypes } from "../../packetTypes";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "rgb(34, 35, 56)",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Devices(props) {
  const [newDeviceModalOpen, setNewDeviceModalOpen] = useState(false);
  const [newDeviceUUID, setNewDeviceUUID] = useState(undefined);
  const [newDeviceSecret, setNewDeviceSecret] = useState(undefined);

  const [newDeviceName, setNewDeviceName] = useState("");
  const [newDeviceType, setNewDeviceType] = useState("");

  const { subscribe, send, unsubscribe } = useContext(WebSocketContext);

  function openAddDeviceModal() {
    setNewDeviceModalOpen(true);
  }

  function closeAddDeviceModal() {
    setNewDeviceModalOpen(false);
    setNewDeviceUUID(undefined);
    setNewDeviceName("");
    setNewDeviceType("");
    setNewDeviceSecret(undefined);
  }

  function fetchNewDeviceUUID() {
    send(PacketTypes.CREATE_DEVICE, {
      device_name: newDeviceName,
      device_type: newDeviceType,
    });
  }

  useEffect(() => {
    subscribe(PacketTypes.CREATE_DEVICE_RESPONSE, (data) => {
      const response = JSON.parse(data);
      if (!response) return;
      setNewDeviceSecret(response.secret);
      setNewDeviceUUID(response.deviceUUID);
    });

    return () => {
      unsubscribe(PacketTypes.CREATE_DEVICE_RESPONSE);
    };
  }, [subscribe, unsubscribe]);

  return (
    <div className="h-100 position-relative" style={{ padding: "60px" }}>
      <p style={{ fontSize: "1.7em", fontWeight: "700" }}>מכשירים</p>
      <DeviceList seperator />
      <IconButton
        aria-label="delete"
        className="position-absolute"
        style={{
          bottom: "50px",
          left: "50px",
          padding: "15px",
          backgroundColor: "rgb(34, 35, 56)",
        }}
        onClick={openAddDeviceModal}
      >
        <AddCircleIcon style={{ color: "white", fontSize: "1.5em" }} />
      </IconButton>
      <Modal open={newDeviceModalOpen} onClose={closeAddDeviceModal}>
        <Box sx={style}>
          <div
            style={{ direction: "rtl", color: "white", fontFamily: "Heebo" }}
          >
            {newDeviceUUID ? (
              <>
                <p className="mb-1">מספר הזיהוי של המכשיר</p>
                <p
                  style={{ backgroundColor: "rgb(27, 28, 49)" }}
                  className="mb-3 p-1 pe-2"
                >
                  {newDeviceUUID}
                </p>
                <p className="mb-1">המזהה הסודי של המכשיר</p>
                <p
                  className="p-1 mb-4 pe-2"
                  style={{ backgroundColor: "rgb(27, 28, 49)" }}
                >
                  {newDeviceSecret}
                </p>
                <p
                  className="mb-1 text-danger text-center"
                  style={{ fontStyle: "italic" }}
                >
                  <span style={{ fontWeight: "700", fontStyle: "normal" }}>
                    שים לב!
                  </span>{" "}
                  חשוב לשמור על המזהה הסודי. לא ניתן לשחזר את המזהה בהמשך.
                </p>
              </>
            ) : (
              <>
                <p style={{ fontWeight: "600", fontSize: "1.4em" }}>
                  הוסף מכשיר חדש
                </p>
                <p className="mb-1">בחר שם למכשיר</p>
                <input
                  value={newDeviceName}
                  onChange={(e) => setNewDeviceName(e.target.value)}
                  style={{
                    backgroundColor: "rgb(27, 28, 49)",
                    border: "0",
                    color: "white",
                  }}
                />
                <p className="mb-1 mt-4">בחר את סוג המכשיר</p>
                <select
                  id="deviceType"
                  name="deviceType"
                  className="ps-2 mb-2"
                  value={newDeviceType}
                  onChange={(e) => setNewDeviceType(e.target.value)}
                >
                  <option value="">סוג המכשיר</option>
                  <option value="CAMERA">מצלמה</option>
                  <option value="DOOR_LOCK">מנעול דלת</option>
                  <option value="AIRCON">מזגן</option>
                  <option value="WATER_HEATER">דוד</option>
                  <option value="LIGHT">תאורה</option>
                </select>
                <br />
                <button
                  className="mt-4 p-2 px-4"
                  style={{
                    backgroundColor: "rgb(27, 28, 49)",
                    border: "0",
                    color: "white",
                  }}
                  onClick={fetchNewDeviceUUID}
                >
                  הוסף מכשיר
                </button>
              </>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default Devices;
