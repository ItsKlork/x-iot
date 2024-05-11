import { Snackbar } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { WebSocketContext } from "./WSContext";
import { PacketTypes } from "../packetTypes";

function NotificationOutlet(props) {
  const [notification, setNotification] = useState(undefined);

  const { subscribe, unsubscribe } = useContext(WebSocketContext);

  useEffect(() => {
    subscribe(PacketTypes.NEW_NOTIFICATION, (notification) => {
      notification = JSON.parse(notification);
      console.log("New notification", notification);
      setNotification(notification);
    });

    return () => {
      unsubscribe(PacketTypes.NEW_NOTIFICATION);
    };
  }, [subscribe, unsubscribe]);

  return (
    <div className="position-relative">
      {props.children}
      <div
        className="position-absolute"
        style={{ bottom: 0, left: 0, zIndex: 1000 }}
      >
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={!!notification}
          autoHideDuration={5000}
          onClose={() => setNotification(undefined)}
          message={notification ? notification.message : undefined}
        />
      </div>
    </div>
  );
}

export default NotificationOutlet;
