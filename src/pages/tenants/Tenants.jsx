import { useContext, useEffect, useState } from "react";
import UserListItem from "./UserListItem";
import EditTenantModal from "./EditTenantModal";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { IconButton } from "@mui/material";
import { WebSocketContext } from "../../components/WSContext";
import { PacketTypes } from "../../packetTypes";
import { AuthContext } from "../../App";

function Tenants(props) {
  const [userList, setUserList] = useState(undefined);
  const [newUserModalOpen, setNewUserModalOpen] = useState(false);

  const [editUserModalOpen, setEditUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(undefined);

  const { subscribe, send, unsubscribe } = useContext(WebSocketContext);

  const { username } = useContext(AuthContext);

  useEffect(() => {
    subscribe(PacketTypes.GET_TENANTS_RESPONSE, (data) => {
      setUserList(JSON.parse(data));
    });

    send(PacketTypes.GET_TENANTS, {});

    return () => {
      unsubscribe(PacketTypes.GET_TENANTS_RESPONSE);
    };
  }, [send, subscribe, unsubscribe]);
  return (
    <div className="d-flex flex-column" style={{ margin: "60px" }}>
      <p style={{ fontSize: "1.7em", fontWeight: "700" }}>דיירים</p>
      {userList !== undefined ? (
        userList.length > 0 ? (
          userList.map((user) => (
            <UserListItem
              key={user.fullName}
              name={user.fullName}
              data={user.face}
              dataType={user.faceDataType}
              webUser={user.webUser}
              activeUser={user.username === username}
              onClick={() => {
                setSelectedUser(user);
                setEditUserModalOpen(true);
              }}
            />
          ))
        ) : (
          <p>אין דיירים</p>
        )
      ) : (
        <p>טוען רשימת דיירים...</p>
      )}
      <EditTenantModal
        newTenant
        openState={[newUserModalOpen, setNewUserModalOpen]}
      />
      <EditTenantModal
        openState={[editUserModalOpen, setEditUserModalOpen]}
        selectedUser={selectedUser}
        onClose={() => {
          setSelectedUser(undefined);
        }}
      />
      <IconButton
        aria-label="delete"
        className="position-absolute"
        style={{
          bottom: "50px",
          left: "50px",
          padding: "15px",
          backgroundColor: "rgb(34, 35, 56)",
        }}
        onClick={() => setNewUserModalOpen(true)}
      >
        <AddCircleIcon style={{ color: "white", fontSize: "1.5em" }} />
      </IconButton>
    </div>
  );
}

export default Tenants;
