import { useEffect, createContext, useRef } from "react";
import constants from "../constants";

const WebSocketContext = createContext(null);

function WebSocketProvider({ children }) {
  const ws = useRef(null);
  const channels = useRef({});

  const subscribe = (pid, callback) => {
    // channel is limited to 10 characters
    console.log("SUBSCRIBED", pid);
    if (pid in channels.current)
      console.error(
        `Packet ID ${pid} already has a function subscribed to it.`
      );
    channels.current[pid] = callback;
  };

  const unsubscribe = (pid) => {
    console.log("UNSUBSCRIBED", pid);
    delete channels.current[pid];
  };

  const send = (pid, data) => {
    ws.current.send(JSON.stringify({ pid: pid, data: data }));
  };

  useEffect(() => {
    ws.current = new WebSocket(constants.WEBSOCKET_URL);

    ws.current.onopen = () => {
      console.log("Connected to server");
    };

    ws.current.onclose = () => {
      console.log("Disconnected from server");
    };

    ws.current.onmessage = (e) => {
      const pid = parseInt(e.data.substring(0, 3));
      const data = e.data.substring(3);
      console.log("Got", pid, data);
      if (pid in channels.current) {
        channels.current[pid](data);
      }
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ subscribe, unsubscribe, send }}>
      {children}
    </WebSocketContext.Provider>
  );
}

export { WebSocketProvider, WebSocketContext };
