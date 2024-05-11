import { useContext, useEffect, useState } from "react";
import CameraGridItem from "./CameraGridItem";
import { WebSocketContext } from "../../components/WSContext";
import ReactHlsPlayer from "@gumlet/react-hls-player";
import { PacketTypes } from "../../packetTypes";
import { Box, Modal, Switch } from "@mui/material";
import constants from "../../constants";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "rgb(34, 35, 56)",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Cameras(props) {
  const [cameraList, setCameraList] = useState(undefined);
  const [filterActive, setFilterActive] = useState(false);

  const { send, subscribe, unsubscribe } = useContext(WebSocketContext);

  const [fullCameraModal, setFullCameraModal] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState(undefined);

  useEffect(() => {
    subscribe(PacketTypes.GET_CAMERAS_RESPONSE, (data) => {
      data = JSON.parse(data);
      setCameraList(data);
      console.log(data);
    });

    send(PacketTypes.GET_CAMERAS, {});

    return () => {
      unsubscribe(PacketTypes.GET_CAMERAS_RESPONSE);
    };
  }, [send, subscribe, unsubscribe]);

  const filteredCameraList = cameraList?.filter(
    (camera) => !filterActive || camera.active
  );
  console.log("SELECTED_CAMERA", selectedCamera);
  return (
    <>
      <div className="container">
        <div className="d-flex flex-column" style={{ margin: "60px" }}>
          <p style={{ fontSize: "1.7em", fontWeight: "700" }}>מצלמות</p>
          <div class="form-check form-switch mb-3">
            <Switch
              checked={filterActive}
              onChange={(e) => setFilterActive(e.target.checked)}
              inputProps={{ "aria-label": "controlled" }}
            />
            <label
              class="form-check-label"
              for="flexSwitchCheckChecked"
              style={{ color: "lightGray", fontStyle: "italic" }}
            >
              הצג מצלמות פעילות בלבד
            </label>
          </div>
          <div className="d-flex flex-row">
            {filteredCameraList !== undefined ? (
              filteredCameraList.length > 0 ? (
                filteredCameraList.map((camera) => (
                  <CameraGridItem
                    key={camera.deviceUUID}
                    camera={camera}
                    onClick={() => {
                      setSelectedCamera(camera);
                      setFullCameraModal(true);
                    }}
                  />
                ))
              ) : (
                <p>אין מצלמות {filterActive && "פעילות"}</p>
              )
            ) : (
              <p>טוען מצלמות...</p>
            )}
          </div>
        </div>
      </div>
      <Modal
        open={fullCameraModal}
        onClose={() => {
          setFullCameraModal(false);
          setSelectedCamera(undefined);
        }}
      >
        <Box sx={style}>
          <div
            style={{ direction: "rtl", color: "white", fontFamily: "Heebo" }}
          >
            {selectedCamera && (
              <>
                <p
                  className="mb-3"
                  style={{ fontSize: "1.5em", fontWeight: 800 }}
                >
                  {selectedCamera.name}
                </p>
                <div className="position-relative">
                  <ReactHlsPlayer
                    src={constants.CAMERA_RPROXY_URL.replace(
                      "%",
                      selectedCamera.deviceUUID
                    )}
                    style={{ zIndex: 0, position: "relative" }}
                    autoPlay={true}
                    controls={false}
                    hlsConfig={{
                      minAutoBitrate: 0,
                      liveSyncDuration: 0,
                      lowLatencyMode: true,
                      liveDurationInfinity: true,
                      xhrSetup: (xhr) => {
                        xhr.setRequestHeader(
                          "Authentication",
                          "Bearer " + localStorage.getItem("token")
                        );
                      },
                    }}
                  />
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
                    <p className="m-1 ms-2">שידור חי</p>
                    <span
                      className="ms-1"
                      style={{
                        height: "15px",
                        width: "15px",
                        backgroundColor: "rgba(255,0,0,0.6)",
                        borderRadius: "50%",
                        display: "inline-block",
                      }}
                    ></span>
                  </div>
                </div>
              </>
            )}
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default Cameras;
