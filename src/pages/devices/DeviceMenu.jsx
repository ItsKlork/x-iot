import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, Fragment, useContext } from "react";
import { Alert, Collapse } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import "../../css/devicemenu.css";
import { WebSocketContext } from "../../components/WSContext";
import { PacketTypes } from "../../packetTypes";

const formTypes = {
  CAMERA: [
    {
      field: "name",
      type: "text",
      label: "שם המצלמה",
    },
    {
      field: "targetDoorLock",
      type: "text",
      label:
        "מזהה של מנהול היעד עבור זיהוי הפנים (מזהה שלא בשימוש=לא לפתוח אף דלת)",
    },
    {
      field: "faceRecognition",
      type: "checkbox",
      label: "הפעל זיהוי פנים",
    },
    {
      field: "httpPort",
      type: "number",
      label: "פורט HTTP (דורש הפעלה מחדש)",
    },
  ],
  DOOR_LOCK: [
    {
      field: "name",
      type: "text",
      label: "שם המנעול",
    },
    {
      field: "openState",
      type: "checkbox",
      label: "פתח/סגור דלת",
    },
  ],
  AIRCON: [
    { field: "name", type: "text", label: "שם המזגן" },
    { field: "temperature", type: "number", label: "טמפרטורה" },
    { field: "isOn", type: "checkbox", label: "פתוח/סגור" },
  ],
  WATER_HEATER: [
    { field: "name", type: "text", label: "שם הדוד" },
    { field: "isOn", type: "checkbox", label: "דלוק/כבוי" },
    {
      field: "timer",
      type: "datetime-local",
      label: "טיימר (ברגע שהתאריך והשעה מגיעים, הדוד נדלק לבד)",
    },
  ],
  LIGHT: [
    { field: "name", type: "text", label: "שם גוף התאורה" },
    { field: "isOn", type: "checkbox", label: "דלוק/כבוי" },
    { field: "brightness", type: "number", label: "בהירות" },
    { field: "color", type: "color", label: "צבע" },
  ],
};

function DeviceMenu(props) {
  const { deviceId } = useParams();
  const [device, setDevice] = useState(null);
  const [formState, setFormState] = useState(null);
  const [message, setMessage] = useState(null); // { type: "success" (mui.Alert.severity), message: "Saved successfully"}

  const navigate = useNavigate();

  const { subscribe, send, unsubscribe } = useContext(WebSocketContext);

  async function saveDeviceSettings(e) {
    console.log("Saving", formState, device);
    setMessage({ type: "info", message: "שומר..." });
    send(PacketTypes.SET_DEVICE_SETTINGS, {
      device_uuid: deviceId,
      settings: { type: device.deviceType, ...formState },
    });
    setMessage({ type: "success", message: "הגדרות המכשיר נשמרו בהצלחה" });
  }

  useEffect(() => {
    if (!deviceId) {
      navigate("/devices");
      return;
    }
    subscribe(PacketTypes.GET_DEVICE_RESPONSE, (data) => {
      const currentDevice = JSON.parse(data);
      console.log("device got", currentDevice);
      const formTemplate = formTypes[currentDevice.deviceType];
      const formStateBuilder = {};
      formTemplate.forEach((field) => {
        formStateBuilder[field.field] = currentDevice.settings[field.field];
      });
      setDevice(currentDevice);
      setFormState(formStateBuilder);
    });

    send(PacketTypes.GET_DEVICE, { device_uuid: deviceId });

    return () => {
      unsubscribe(PacketTypes.GET_DEVICE_RESPONSE);
    };
  }, [deviceId, navigate, send, subscribe, unsubscribe]);

  if (!device)
    return (
      <div>
        <p>טוען...</p>
      </div>
    );

  const deviceFormTemplate = formTypes[device.deviceType];
  console.log(device);
  return (
    <div className="m-4">
      <p
        className="mb-0"
        style={{ fontWeight: 700, fontSize: "1.2em", display: "inline-block" }}
      >
        עריכת <span style={{ fontWeight: 300 }}>{device.settings.name}</span>
      </p>
      <p
        className="me-3"
        style={{
          fontWeight: 200,
          direction: "ltr",
          display: "inline-block",
          fontSize: "0.9em",
        }}
      >
        {device.deviceUUID}
      </p>
      <br />
      {/* Dynamic form */}
      {deviceFormTemplate.map((field) => (
        <Fragment key={field.field}>
          <p className="mb-0">{field.label}</p>
          {console.log(field.field, formState[field.field])}
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
          {(field.type === "datetime-local" ||
            field.type === "color" ||
            field.type === "number") && <br />}
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
