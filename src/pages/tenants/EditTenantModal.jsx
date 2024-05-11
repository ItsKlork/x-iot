import { useContext, useEffect, useRef, useState } from "react";
import { Alert, Box, Collapse, Modal, Switch } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { WebSocketContext } from "../../components/WSContext";
import { PacketTypes } from "../../packetTypes";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "rgb(34, 35, 56)",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function EditTenantModal(props) {
  const fileInput = useRef(null);

  const [open, setOpen] = props.openState;
  const isNew = props.newTenant;

  const [fullName, setFullName] = useState("");
  const [face, setFace] = useState(undefined);
  const [isWebUser, setIsWebUser] = useState(false);
  const [webUsername, setWebUsername] = useState("");
  const [webPassword, setWebPassword] = useState("");

  const [submissionStatus, setSubmissionStatus] = useState(undefined);

  const [prevOpen, setPrevOpen] = useState(props.openState);

  const { send, subscribe, unsubscribe } = useContext(WebSocketContext);

  useEffect(() => {
    const selectedTenant = props.selectedUser;
    if (selectedTenant !== undefined) {
      setFullName(selectedTenant.fullName);
      setFace({
        faceDataType: selectedTenant.faceDataType,
        face: selectedTenant.face,
      });
      if (selectedTenant.webUser) {
        setIsWebUser(true);
        setWebUsername(selectedTenant.username);
      }
    }

    const editOrDeleteResponseHandler = function (data) {
      data = JSON.parse(data);
      if (data.response === "success") {
        setOpen(false);
        setFullName("");
        setFace(undefined);
        setIsWebUser(false);
        setWebUsername("");
        setWebPassword("");
        setSubmissionStatus(undefined);
        if ("onClose" in props) props.onClose();
      } else if (data.response === "error") setSubmissionStatus(data.error);
    };
    console.log(prevOpen, open);
    if (prevOpen !== open) {
      if (open) {
        subscribe(
          PacketTypes.UPDATE_TENANT_RESPONSE,
          editOrDeleteResponseHandler
        );
        subscribe(
          PacketTypes.REMOVE_TENANT_RESPONSE,
          editOrDeleteResponseHandler
        );
        subscribe(PacketTypes.ADD_TENANT_RESPONSE, editOrDeleteResponseHandler);
      } else {
        unsubscribe(PacketTypes.UPDATE_TENANT_RESPONSE);
        unsubscribe(PacketTypes.REMOVE_TENANT_RESPONSE);
        unsubscribe(PacketTypes.ADD_TENANT_RESPONSE);
      }
      setPrevOpen(open);
    }
  }, [
    props.selectedUser,
    subscribe,
    setOpen,
    props,
    unsubscribe,
    open,
    prevOpen,
  ]);

  function closeModal() {
    setOpen(false);
    setFullName("");
    setFace(undefined);
    setIsWebUser(false);
    setWebUsername("");
    setWebPassword("");
    setSubmissionStatus(undefined);

    if ("onClose" in props) props.onClose();
  }

  function toggleWebUser() {
    if (isWebUser) {
      setWebUsername("");
      setWebPassword("");
    }
    setIsWebUser(!isWebUser);
  }

  function removeTenant() {
    setSubmissionStatus("מוחק...");
    send(PacketTypes.REMOVE_TENANT, { uuid: props.selectedUser.uuid });
  }

  function updateTenant() {
    // Update an existing tenant
    setSubmissionStatus("מעדכן...");
    send(PacketTypes.UPDATE_TENANT, {
      uuid: props.selectedUser.uuid,
      fullName: fullName !== props.selectedUser.fullName ? fullName : undefined,
      updatedPassword:
        isWebUser && webPassword.trim().length !== 0 ? webPassword : undefined,
      webUser: isWebUser,
      face: face.face !== props.selectedUser.face ? face.face : undefined,
      faceDataType:
        face.faceDataType !== props.selectedUser.face
          ? face.faceDataType
          : undefined,
      webUsername:
        isWebUser && face.webUsername !== webUsername ? webUsername : undefined,
    });
  }

  function addTenant() {
    setSubmissionStatus("מוסיף...");
    let newTenantObject = {
      fullName: fullName,
      webUser: isWebUser,
      face: face.face,
      faceDataType: face.faceDataType,
    };
    if (isWebUser) {
      newTenantObject["webUsername"] = webUsername;
      newTenantObject["webPassword"] = webPassword;
    }
    send(PacketTypes.ADD_TENANT, newTenantObject);
  }

  function addOrUpdateTenant() {
    if (fullName === "") {
      setSubmissionStatus("נא למלא שם מלא.");
      return;
    }
    if (face === undefined) {
      setSubmissionStatus("נא להוסיף תמונת פרצוף.");
      return;
    }
    if (isWebUser && webUsername.trim().length === 0) {
      setSubmissionStatus("לדייר בעל חשבון צריך להיות שם משתמש.");
      return;
    }
    if (isWebUser && !props.selectedUser && webPassword.trim().length === 0) {
      setSubmissionStatus("חייב לקבוע סיסמה לדייר.");
      return;
    }

    if (props.selectedUser) {
      updateTenant();
    } else {
      // Create a new tenant
      addTenant();
    }
  }

  // File handling
  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () =>
        resolve(reader.result.substr(reader.result.indexOf(",") + 1));
      reader.onerror = reject;
    });
  };

  async function selectedFile(e) {
    const file = e.target.files[0];
    const fileType = file.type;
    if (!fileType.startsWith("image/")) {
      alert("נא לבחור קובץ תמונה בלבד.");
      return;
    }
    const base64FileData = await toBase64(file); // Convert to base64
    setFace({ faceDataType: fileType, face: base64FileData });
  }

  function removeFace() {
    setFace(undefined);
  }

  return (
    <Modal open={open} onClose={closeModal}>
      <Box sx={style}>
        <div style={{ direction: "rtl", color: "white", fontFamily: "Heebo" }}>
          <p style={{ fontWeight: "600", fontSize: "1.4em" }}>
            {isNew ? "הוסף דייר חדש" : "ערוך דייר קיים"}
          </p>
          <p className="mb-1">שם מלא</p>
          <input
            value={fullName}
            className="pe-2"
            onChange={(e) => setFullName(e.target.value)}
            style={{
              backgroundColor: "rgb(27, 28, 49)",
              border: "0",
              color: "white",
            }}
          />
          <hr className="my-4" />
          <p className="mb-1 mt-4">חשבון באתר</p>
          <Switch checked={isWebUser} onChange={toggleWebUser} />
          {isWebUser && (
            <>
              <hr className="my-2" />
              <p
                className="mb-1 mt-4"
                style={{ fontWeight: "bold", fontSize: "1.1em" }}
              >
                פרטי חשבון באתר{" "}
                <span style={{ fontStyle: "italic" }}>(באנגלית)</span>
              </p>
              <p className="mb-1 mt-4">שם משתמש</p>
              <input
                value={webUsername}
                className="ps-2"
                onChange={(e) => setWebUsername(e.target.value)}
                style={{
                  backgroundColor: "rgb(27, 28, 49)",
                  border: "0",
                  direction: "ltr",
                  textAlign: "left",
                  color: "white",
                }}
              />
              <p className="mb-1 mt-3">
                סיסמה {props.selectedUser && "(סיסמה ריקה=ללא שינוי)"}
              </p>
              <input
                value={webPassword === null ? "" : webPassword}
                className="ps-2"
                type="password"
                onChange={(e) => setWebPassword(e.target.value)}
                style={{
                  backgroundColor: "rgb(27, 28, 49)",
                  border: "0",
                  direction: "ltr",
                  textAlign: "left",
                  color: "white",
                }}
              />
            </>
          )}
          <hr className="my-4" />
          <p className="mb-2 mt-4">תמונת פרצוף</p>
          <p
            style={{
              fontStyle: "italic",
              color: "lightgray",
              fontSize: "0.8em",
            }}
          >
            על מנת שעדכון תמונת הפרצוף של הדייר תעבוד עם זיהוי הפנים, יש להפעיל
            מחדש את המצלמות.
          </p>
          {face !== undefined ? (
            <div className="mt-3" style={{ position: "relative" }}>
              <img
                style={{
                  width: "250px",
                  height: "250px",
                  objectFit: "cover",
                }}
                src={`data:${face.faceDataType};charset=utf-8;base64,${face.face}`}
                alt="פרצוף"
              />
              <div
                style={{
                  position: "absolute",
                  top: "0",
                  right: "0",
                  width: "250px",
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                }}
              >
                <DeleteIcon
                  style={{
                    color: "white",
                    fontSize: "2.5em",
                    cursor: "pointer",
                  }}
                  onClick={removeFace}
                  className="p-2 m-1"
                />
              </div>
            </div>
          ) : (
            <>
              <i>
                <p className="mt-2 p-0 mb-1" style={{ fontWeight: 300 }}>
                  אין תמונה קיימת של פרצוף הדייר.
                </p>
                <p className="mb-0" style={{ fontWeight: 200 }}>
                  יש להוסיף תמונה המראה את פרצוף הדייר באופן בולט וברור.
                </p>
              </i>
              <input
                type="file"
                id="file"
                ref={fileInput}
                style={{ display: "none" }}
                onChange={selectedFile}
              />
              <button
                className="mt-4 btn btn-dark"
                style={{ backgroundColor: "rgb(27, 28, 49)" }}
                onClick={() => {
                  fileInput.current.click();
                }}
              >
                הוסף תמונה
              </button>
            </>
          )}
          <hr className="my-4" />
          <button
            className="btn btn-dark"
            onClick={addOrUpdateTenant}
            style={{
              backgroundColor: "rgb(27, 28, 49)",
              fontWeight: 600,
              width: "200px",
            }}
          >
            {isNew ? "הוסף דייר" : "עדכן דייר"}
          </button>
          {!isNew && (
            <button
              className="btn btn-danger me-3"
              onClick={removeTenant}
              style={{
                backgroundColor: "rgb(27, 28, 49)",
                fontWeight: 300,
              }}
            >
              מחק דייר
            </button>
          )}
          <Collapse in={!!submissionStatus}>
            {submissionStatus && (
              <Alert
                severity={
                  submissionStatus === "מוחק..." ||
                  submissionStatus === "מעדכן..."
                    ? "info"
                    : "error"
                }
                className="mt-5 align-items-center"
              >
                {submissionStatus}
              </Alert>
            )}
          </Collapse>
        </div>
      </Box>
    </Modal>
  );
}

export default EditTenantModal;
