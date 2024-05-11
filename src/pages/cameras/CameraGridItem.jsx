import StartIcon from "@mui/icons-material/Start";

function CameraGridItem({ onClick, camera }) {
  return (
    <div
      className="m-3"
      style={{ height: "200px", width: "400px", position: "relative" }}
    >
      <div
        className="d-flex flex-column align-items-center"
        style={{
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
      >
        <img
          src="/cam_thumbnail.png"
          alt="Camera demo thumbnail"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            boxShadow:
              "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
            borderRadius: "15px",
          }}
        />
      </div>
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 10,
        }}
      >
        <p
          className="m-3 pe-1"
          style={{
            fontSize: "1.2em",
            fontWeight: "600",
            textShadow: "rgba(100, 100, 111, 0.2)  1px 0 10px",
          }}
        >
          {camera.name}
        </p>
        {camera.active && (
          <StartIcon
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              cursor: "pointer",
            }}
            className="m-3"
            onClick={onClick}
          />
        )}
        <div
          className="m-3 d-flex align-items-center px-2"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "36px",
            borderRadius: "18px",
            backgroundColor: "rgba(0,0,0,0.6)",
          }}
        >
          <p className="m-1 ms-2">{camera.active ? "פעיל" : "לא פעיל"}</p>
          {camera.active && (
            <span
              className="ms-1"
              style={{
                height: "15px",
                width: "15px",
                backgroundColor: "rgba(100,255,100,0.6)",
                borderRadius: "50%",
                display: "inline-block",
              }}
            ></span>
          )}
        </div>
      </div>
    </div>
  );
}

export default CameraGridItem;
