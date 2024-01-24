import { useEffect, useState } from "react";
import UpdateItem from "./UpdateItem";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import NoMeetingRoomIcon from "@mui/icons-material/NoMeetingRoom";

function LatestUpdates(props) {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    const x = async () => {
      await new Promise((r) => setTimeout(r, 1000));
      setUpdates([
        {
          message: "בן גביר נכנס הביתה",
          time: 1701615148,
          event_type: "door",
          event_result: "success",
          iconColor: "#93D6C2",
          icon: MeetingRoomIcon,
        },
        {
          message: "נחסם ניסיון כניסה בלתי מזוהה",
          time: 1701615000,
          event_type: "door",
          event_result: "failed",
          iconColor: "red",
          icon: NoMeetingRoomIcon,
        },
      ]);
    };

    x();
  }, []);

  return (
    <div className="d-flex flex-column">
      <p style={{ fontSize: "1.7em", fontWeight: "700" }}>עדכונים אחרונים</p>
      {updates.length === 0 ? (
        <p>אין עדכונים</p>
      ) : (
        updates.map((update) => (
          <UpdateItem
            icon={update.icon}
            iconColor={update.iconColor}
            message={update.message}
            key={update.message}
          />
        ))
      )}
    </div>
  );
}

export default LatestUpdates;
