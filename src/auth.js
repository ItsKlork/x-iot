import server from "./networkProtocol";
import programNavigate from "./history";

// server.registerListener("auth", (data) => {
//   const response = JSON.parse(data);
//   if (response.status === "success") {
//     authProvider.isAuthenticated = true;
//     authProvider.username = response.username;
//     authProvider.name = response.name;
//     programNavigate.navigate("/dashboard");
//   } else {
//     console.log(`Error: ${response.error}`);
//     authProvider.isAuthenticated = false;
//     authProvider.username = null;
//     authProvider.name = null;
//   }
// });

export const authProvider = {
  isAuthenticated: false,
  username: null,
  name: null,
  async signin(username, password) {
    server.send(JSON.stringify({ type: "auth", data: { username, password } }));
  },
  async signout() {
    await new Promise((r) => setTimeout(r, 500)); // fake delay
    authProvider.isAuthenticated = false;
    authProvider.username = "";
    console.log("Signed out");
  },
};
