import PhotoCameraFrontIcon from "@mui/icons-material/PhotoCameraFront";
import SimCardAlertIcon from "@mui/icons-material/SimCardAlert";
import DoorbellIcon from "@mui/icons-material/Doorbell";
import DeviceHubIcon from "@mui/icons-material/DeviceHub";
import AvTimerIcon from "@mui/icons-material/AvTimer";

const IconMapping = {
  CAMERA_INFO: <PhotoCameraFrontIcon />,
  CAMERA_BAD: <SimCardAlertIcon />,
  DOOR_BELL: <DoorbellIcon />,
  DEVICE_INFO: <DeviceHubIcon />,
  IMMERSION_TIMER: <AvTimerIcon />,
};
function UpdateItem(props) {
  const { timestamp, message, notificationType } = props.notification;
  return (
    <>
      <p
        style={{ direction: "rtl", color: "#9c9c9c", fontStyle: "italic" }}
        className="m-0 me-2"
      >
        {
          // Display the timestamp in Hebrew, like "Today, 12:34:56 PM"
          new Date(timestamp).toLocaleString("he-IL", {
            weekday: "short",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          })
        }
      </p>

      <div
        className="d-flex flex-row align-items-center p-1 pe-3 mb-3"
        style={{ backgroundColor: "#0f101a", borderRadius: "10px" }}
      >
        {IconMapping[notificationType]}
        <p className="me-3 my-2">{message}</p>
      </div>
    </>
  );
}

export default UpdateItem;
