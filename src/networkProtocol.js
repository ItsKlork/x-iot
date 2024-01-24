import constants from "./constants";

var server = (function () {
  console.log("LAUNCHED WEB SOCKET");
  const ws = new WebSocket(constants.WEBSOCKET_URL);
  const dataTargetMap = {};
  ws.addEventListener("open", function (event) {
    console.log(`Connected to server ${constants.WEBSOCKET_URL}`);
  });

  ws.addEventListener("message", function (event) {
    const key = event.data.substring(0, 10).trim();
    const value = event.data.substring(10).trim();
    if (key in dataTargetMap) dataTargetMap[key](value);
    else console.log(`No data target found for key ${key}`);
  });

  return {
    send: function (dataToSend) {
      console.log(`Sending data to server: ${dataToSend}`);
      ws.send(dataToSend);
    },
    registerListener: function (k, pointer) {
      dataTargetMap[k] = pointer;
    },
  };
})();

export default server;
