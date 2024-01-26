import { useEffect, createContext, useRef } from "react";
import constants from "../constants";

const WebSocketContext = createContext(null);

function WebSocketProvider({ children }) {
  const ws = useRef(null);
  const channels = useRef({});

  const subscribe = (channel, callback) => {
    // channel is limited to 10 characters
    channels.current[channel] = callback;
  };

  const unsubscribe = (channel) => {
    delete channels.current[channel];
  };

  const send = (message) => {
    ws.current.send(message);
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
      const channel = e.data.substring(0, 10).trim();
      const data = e.data.substring(10);
      if (channel in channels.current) {
        channels.current[channel](data);
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
