import { IconButton } from "@mui/material";
import ActiveDevices from "../../components/ActiveDevices";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

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
    (async () => {
      await new Promise((r) => setTimeout(r, 1000));
      setNewDeviceUUID(uuidv4());
      setNewDeviceSecret("SuperSecretKey");
    })();
  }

  return (
    <div className="h-100 position-relative" style={{ padding: "60px" }}>
      <p style={{ fontSize: "1.7em", fontWeight: "700" }}>מכשירים</p>
      <ActiveDevices seperator />
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
                <p className="mb-1">מספר הזיהוי של המכשיר הוא</p>
                <p
                  style={{ backgroundColor: "rgb(27, 28, 49)" }}
                  className="mb-3 p-1"
                >
                  {newDeviceUUID}
                </p>
                <p className="mb-1">המזהה הסודי של המכשיר הוא</p>
                <p
                  className="p-1"
                  style={{ backgroundColor: "rgb(27, 28, 49)" }}
                >
                  {newDeviceSecret}
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
                  <option value="camera">מצלמה</option>
                  <option value="door">דלת</option>
                  <option value="aircon">מזגן</option>
                  <option value="water-heater">דוד</option>
                  <option value="light">תאורה</option>
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
