import { useParams } from "react-router-dom";
import { useEffect, useState, Fragment } from "react";
import { Alert, Collapse } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import "../../css/devicemenu.css";

const deviceDataDummy = [
  {
    deviceName: "מצלמה 1",
    deviceType: "camera",
    uuid: "e3849810-f41d-41e3-9447-336e1905b936",
    iconColor: "#d2edfc",
    state: {
      face_recognition: true,
    },
  },
  {
    deviceName: "מצלמה 2",
    deviceType: "camera",
    uuid: "06c64f00-8cc4-4510-aa22-928b0d001f5a",
    iconColor: "#d2edfc",
    state: {
      face_recognition: false,
    },
  },
  {
    deviceName: "דלת כניסה",
    deviceType: "door",
    uuid: "5a9ae3e9-84b4-4c37-88a2-bfee5db44654",
    iconColor: "#b38f6b",
    state: {
      open_state: false,
    },
  },
  {
    deviceName: "דלת כניסה",
    deviceType: "door",
    uuid: "466799f8-0d84-4c8a-b5f2-283f5bd89dbe",
    iconColor: "#b38f6b",
    state: {
      open_state: false,
    },
  },
  {
    deviceName: "מצלמה 1",
    deviceType: "camera",
    uuid: "933283cb-c0c0-4739-aaa0-0d4321469b32",
    iconColor: "#d2edfc",
    state: {
      face_recognition: false,
    },
  },
  {
    deviceName: "מצלמה 2",
    deviceType: "camera",
    uuid: "c923e9bc-e20a-4eea-8c43-f2e7b884d255",
    iconColor: "#d2edfc",
    state: {
      face_recognition: false,
    },
  },
  {
    deviceName: "דלת כניסה",
    deviceType: "door",
    uuid: "e4473eb1-09a3-40ea-8f94-d4246b579bf7",
    iconColor: "#b38f6b",
    state: {
      open_state: false,
    },
  },
  {
    deviceName: "דלת כניסה",
    deviceType: "door",
    uuid: "54b3a0a4-bf78-49c8-98d1-d7d5df36cd17",
    iconColor: "#b38f6b",
    state: {
      open_state: false,
    },
  },
  {
    deviceName: "מצלמה 1",
    deviceType: "camera",
    uuid: "9af01b53-80ea-4223-9d21-19439da2b3c9",
    iconColor: "#d2edfc",
    state: {
      face_recognition: false,
    },
  },
  {
    deviceName: "מצלמה 2",
    deviceType: "camera",
    uuid: "c6bf9bf8-8c5d-451c-ae8f-a611c45969bd",
    iconColor: "#d2edfc",
    state: {
      face_recognition: false,
    },
  },
  {
    deviceName: "דלת כניסה",
    deviceType: "door",
    uuid: "3a846e59-f686-4464-8a99-12ce54514712",
    iconColor: "#b38f6b",
    state: {
      open_state: false,
    },
  },
  {
    deviceName: "דלת כניסה",
    deviceType: "door",
    uuid: "06284f60-230f-49c0-9281-50a97a2f4281",
    iconColor: "#b38f6b",
    state: {
      open_state: false,
    },
  },
  {
    deviceName: "מצלמה 1",
    deviceType: "camera",
    uuid: "82308ba1-9e22-44b6-9323-cde29b7dd5bf",
    iconColor: "#d2edfc",
    state: {
      face_recognition: false,
    },
  },
  {
    deviceName: "מצלמה 2",
    deviceType: "camera",
    uuid: "63834360-a8d2-4581-aaa6-ded594a24b8f",
    iconColor: "#d2edfc",
    state: {
      face_recognition: false,
    },
  },
  {
    deviceName: "דלת כניסה",
    deviceType: "door",
    uuid: "36e1fe7d-1de7-4aaf-b345-8ab52fc5a20c",
    iconColor: "#b38f6b",
    state: {
      open_state: false,
    },
  },
  {
    deviceName: "דלת כניסה",
    deviceType: "door",
    uuid: "355ed91d-4621-4928-9f23-1768745112f9",
    iconColor: "#b38f6b",
    state: {
      open_state: false,
    },
  },
  {
    deviceName: "מצלמה 1",
    deviceType: "camera",
    uuid: "00176984-65c7-4037-9af8-a31289c7041f",
    iconColor: "#d2edfc",
    state: {
      face_recognition: false,
    },
  },
  {
    deviceName: "מצלמה 2",
    deviceType: "camera",
    uuid: "55260ed9-a73f-47f6-86b1-cc3df8942ace",
    iconColor: "#d2edfc",
    state: {
      face_recognition: false,
    },
  },
  {
    deviceName: "דלת כניסה",
    deviceType: "door",
    uuid: "8897349b-6756-4745-b11d-56691ec02675",
    iconColor: "#b38f6b",
    state: {
      open_state: false,
    },
  },
  {
    deviceName: "דלת כניסה",
    deviceType: "door",
    uuid: "ca2495c3-d6bf-4cac-926e-ee1e756f8876",
    iconColor: "#b38f6b",
    state: {
      open_state: false,
    },
  },
];

const formTypes = {
  camera: [
    { field: "camera_name", type: "text", label: "שם המצלמה" },
    {
      field: "enable_face_recognition",
      type: "checkbox",
      label: "הפעל זיהוי פנים",
      valueFromState: "face_recognition",
    },
  ],
  door: [
    { field: "door_name", type: "text", label: "שם הדלת" },
    {
      field: "door_toggle",
      type: "checkbox",
      label: "פתח/סגור דלת",
      valueFromState: "open_state",
    },
  ],
};

function findDevice(uuid) {
  return deviceDataDummy.find((device) => device.uuid === uuid);
}

function DeviceMenu(props) {
  const { deviceId } = useParams();
  const [device, setDevice] = useState(null);
  const [formState, setFormState] = useState(null);
  const [message, setMessage] = useState(null); // { type: "success" (mui.Alert.severity), message: "Saved successfully"}

  async function saveDeviceSettings(e) {
    console.log("Saving", formState);
    setMessage({ type: "info", message: "שומר..." });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setMessage({ type: "success", message: "הגדרות המכשיר נשמרו בהצלחה" });
    // setMessage({ type: "error", message: "לא ניתן לקרוא למכשיר בשם זה" });
  }

  useEffect(() => {
    (async () => {
      const currentDevice = findDevice(deviceId);
      const formTemplate = formTypes[currentDevice.deviceType];
      const formStateBuilder = {};
      formTemplate.forEach((field) => {
        formStateBuilder[field.field] =
          "valueFromState" in field
            ? currentDevice.state[field.valueFromState]
            : "";
      });
      setDevice(currentDevice);
      setFormState(formStateBuilder);
    })();
  }, [deviceId, device]);

  if (!device)
    return (
      <div>
        <p>טוען...</p>
      </div>
    );

  const deviceFormTemplate = formTypes[device.deviceType];
  return (
    <div className="m-4">
      <p className="mb-0" style={{ fontWeight: 700, fontSize: "1.2em" }}>
        עריכת <span style={{ fontWeight: 300 }}>{device.deviceName}</span>
      </p>
      <br />
      {deviceFormTemplate.map((field) => (
        <Fragment key={field.field}>
          <p className="mb-0">{field.label}</p>
          {field.type === "checkbox" ? (
            <div className="d-flex align-items-right">
              <input
                className="mb-3 form-check-input bg-dark text-light"
                style={{ width: "20px", height: "20px" }}
                type={field.type}
                checked={formState[field.field]}
                onChange={(e) => {
                  setFormState({
                    ...formState,
                    [field.field]: e.target.checked,
                  });
                }}
              />
            </div>
          ) : (
            <input
              className="mb-3 bg-dark text-light px-2"
              type={field.type}
              style={{ border: "0", borderRadius: "5px" }}
              value={formState[field.field]}
              onChange={(e) => {
                setFormState({ ...formState, [field.field]: e.target.value });
              }}
            />
          )}
        </Fragment>
      ))}
      <button className="mt-2 btn btn-dark" onClick={saveDeviceSettings}>
        שמור שינויים
      </button>
      <Collapse in={!!message}>
        {message && (
          <Alert
            severity={message.type}
            className="mt-5 align-items-center"
            {...(message.type === "success" && {
              icon: <CheckIcon />,
              onClose: () => setMessage(null),
            })}
          >
            {message.message}
          </Alert>
        )}
      </Collapse>
    </div>
  );
}

export default DeviceMenu;
