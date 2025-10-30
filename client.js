// client.js
import { io } from "https://cdn.socket.io/4.5.4/socket.io.esm.min.js";

// Connect to the server (replace with the actual server URL if deployed elsewhere)
const socket = io("http://localhost:3000");

// Listen for the 'connect' event
socket.on("connect", () => {
  console.log("Connected to the server");

  // Send a message to the server
  socket.send("Hello from the client!");

  // Emit a custom event 'coucou' with some data
  socket.emit("coucou", { message: "Hello from coucou!" });
});

// Listen for messages from the server
socket.on("message", (data) => {
  console.log("Message from server:", data);
});

// Listen for disconnect event
socket.on("disconnect", () => {
  console.log("Disconnected from the server");
});