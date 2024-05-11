import { useContext, useEffect, useState } from "react";
import UpdateItem from "./UpdateItem";
import { WebSocketContext } from "../../components/WSContext";
import { PacketTypes } from "../../packetTypes";

function LatestUpdates(props) {
  const { subscribe, unsubscribe, send } = useContext(WebSocketContext);

  const [notifications, setNotifications] = useState(undefined);

  useEffect(() => {
    subscribe(PacketTypes.GET_NOTIFICATIONS_RESPONSE, (notifications) => {
      notifications = JSON.parse(notifications);
      console.log("Got notifications", notifications);
      setNotifications(notifications);
    });

    send(PacketTypes.GET_NOTIFICATIONS, {});

    return () => {
      unsubscribe(PacketTypes.GET_NOTIFICATIONS_RESPONSE);
    };
  }, [subscribe, unsubscribe, send]);

  return (
    <div className="d-flex flex-column">
      <p style={{ fontSize: "1.7em", fontWeight: "700" }}>הודעות אחרונות</p>
      {!notifications ? (
        <p>טוען הודעות...</p>
      ) : notifications.length > 0 ? (
        notifications.map((notif) => (
          <UpdateItem
            notification={notif}
            key={notif.timestamp + notif.message}
          />
        ))
      ) : (
        <p>אין הודעות חדשות</p>
      )}
    </div>
  );
}

export default LatestUpdates;
