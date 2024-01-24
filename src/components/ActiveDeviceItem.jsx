import { useNavigate } from "react-router-dom";

function ActiveDeviceItem(props) {
  const navigate = useNavigate();

  function openDevicePage() {
    navigate(`/dashboard/devices/${props.uuid}`);
  }

  return (
    <>
      <div
        className="d-flex flex-row m-1 align-items-center"
        style={{ fontSize: "1.3em", width: "250px", cursor: "pointer" }}
        onClick={openDevicePage}
      >
        <props.icon style={{ color: props.iconColor, fontSize: "1.5em" }} />
        <p className="me-3 my-2">{props.deviceName}</p>
      </div>
      {props.seperator && <hr style={{ width: "200px", margin: "0" }} />}
    </>
  );
}

export default ActiveDeviceItem;
