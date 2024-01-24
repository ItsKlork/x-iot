function CameraListItem(props) {
  function openCameraStreamModal() {
    alert("open camera stream modal for " + props.name);
  }

  return (
    <div
      className="m-3 d-flex flex-column align-items-center"
      style={{ cursor: "pointer" }}
      onClick={openCameraStreamModal}
    >
      <img
        src={`data:${props.thumbnailURI};base64,${props.thumbnailData}`}
        alt="camera thumbnail"
        style={{
          height: "162px",
          width: "288px",
          objectFit: "cover",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        }}
      />
      <p
        className="m-2"
        style={{
          fontSize: "1.2em",
          fontWeight: "600",
          textShadow: "rgba(100, 100, 111, 0.2)  1px 0 10px",
        }}
      >
        {props.name}
      </p>
    </div>
  );
}

export default CameraListItem;
