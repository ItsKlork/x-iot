import { useEffect, useRef, useState } from "react";
import { Box, Modal } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

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
  const selectedUser = props.selectedUser;
  const [fullName, setFullName] = useState(
    selectedUser !== undefined ? selectedUser.fullName : ""
  );
  const [face, setFace] = useState(
    selectedUser !== undefined
      ? { faceDataType: selectedUser.faceDataType, face: selectedUser.face }
      : undefined
  );

  useEffect(() => {
    setFullName(selectedUser !== undefined ? selectedUser.fullName : "");
    setFace(
      selectedUser !== undefined
        ? { faceDataType: selectedUser.faceDataType, face: selectedUser.face }
        : undefined
    );
  }, [selectedUser]);
  /*
    {
          faceDataType: "image/jpeg",
          face: "/9j/4AAQSkZJRgABAQAAAQABAAD",
    }
   */

  function closeModal() {
    setOpen(false);
    setFullName("");
    setFace(undefined);

    if ("onClose" in props) props.onClose();
  }

  function removeTenant() {
    alert("TODO: remove tenant");
  }

  function addTenant() {
    if (fullName === "") {
      alert("נא למלא שם מלא.");
      return;
    }
    if (face === undefined) {
      alert("נא להוסיף תמונת פרצוף.");
      return;
    }
    // TODO: communicate with server
    // TODO: reload user list if successful
    closeModal();
  }

  // File handling
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () =>
        resolve(reader.result.substr(reader.result.indexOf(",") + 1));
      reader.onerror = reject;
    });

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
  console.log(
    selectedUser,
    selectedUser !== undefined ? selectedUser.fullName : "",
    selectedUser !== undefined
      ? { faceDataType: selectedUser.faceDataType, face: selectedUser.face }
      : undefined
  );
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
          <p className="mb-2 mt-4">תמונת פרצוף</p>
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
            onClick={addTenant}
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
        </div>
      </Box>
    </Modal>
  );
}

export default EditTenantModal;
