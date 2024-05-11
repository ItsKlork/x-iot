const PacketTypes = {
  WEB_AUTHENTICATION: 0,
  WEB_AUTH_SIGN_OUT: 1,
  GET_DEVICES: 2,
  GET_DEVICE: 3,
  SET_DEVICE_SETTINGS: 4,
  CREATE_DEVICE: 5,
  GET_TENANTS: 6,
  UPDATE_TENANT: 7,
  REMOVE_TENANT: 8,
  ADD_TENANT: 9,
  GET_CAMERAS: 10,
  GET_NOTIFICATIONS: 11,
  WEB_AUTH_TOKEN: 12,
  REMOVE_DEVICE: 13,
  // END REGION

  // Server to web client websocket packets (50 - 99)
  WEB_AUTHENTICATION_RESPONSE: 50,
  WEB_AUTH_SIGN_OUT_RESPONSE: 51,
  GET_DEVICES_RESPONSE: 52,
  GET_DEVICE_RESPONSE: 53,
  SET_DEVICE_SETTINGS_RESPONSE: 54,
  CREATE_DEVICE_RESPONSE: 55,
  GET_TENANTS_RESPONSE: 56,
  UPDATE_TENANT_RESPONSE: 57,
  REMOVE_TENANT_RESPONSE: 58,
  ADD_TENANT_RESPONSE: 59,
  GET_CAMERAS_RESPONSE: 60,
  NEW_NOTIFICATION: 61,
  GET_NOTIFICATIONS_RESPONSE: 62,
  WEB_AUTH_TOKEN_RESPONSE: 63,
  REMOVE_DEVICE_RESPONSE: 64,
};

function getPacketTypeFromPID(pid) {
  return Object.keys(PacketTypes).find((key) => PacketTypes[key] === pid);
}

export { PacketTypes, getPacketTypeFromPID };
