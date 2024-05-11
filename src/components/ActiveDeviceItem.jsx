import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext, useEffect } from "react";
import { WebSocketContext } from "./WSContext";
import { PacketTypes } from "../packetTypes";

function ActiveDeviceItem(props) {
  const navigate = useNavigate();

  const { subscribe, send, unsubscribe } = useContext(WebSocketContext);

  useEffect(() => {
    subscribe(PacketTypes.REMOVE_DEVICE_RESPONSE, (data) => {
      const response = JSON.parse(data);
      if (response.status === "success") {
        navigate("/dashboard/devices");
      }
    });

    return () => {
      unsubscribe(PacketTypes.REMOVE_DEVICE_RESPONSE);
    };
  }, [subscribe, unsubscribe, send, navigate]);

  function openDevicePage() {
    navigate(`/dashboard/devices/${props.uuid}`);
  }

  function removeDevice() {
    send(PacketTypes.REMOVE_DEVICE, { device_uuid: props.uuid });
  }

  return (
    <>
      <div
        className="d-flex flex-row m-1 align-items-center"
        style={{ fontSize: "1.3em", width: "250px" }}
      >
        <span
          onClick={openDevicePage}
          className="d-flex flex-row align-items-center"
          style={{ cursor: "pointer", width: "200px" }}
        >
          <props.icon
            style={{
              color: props.iconColor,
              fontSize: "1.5em",
              display: "inline-block",
            }}
          />
          <p className="me-3 my-2">{props.deviceName}</p>
        </span>
        <DeleteIcon
          onClick={removeDevice}
          style={{
            color: "#ff4d4d",
            fontSize: "1.5em",
            cursor: "pointer",
          }}
        />
      </div>
      {props.seperator && <hr style={{ width: "200px", margin: "0" }} />}
    </>
  );
}

export default ActiveDeviceItem;
