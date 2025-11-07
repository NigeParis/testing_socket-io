// client.js

import './style.css'
import  io  from "socket.io-client"

const chatWindow = document.getElementById('t-chatbox') as HTMLDivElement;
// const sendButton = document.getElementById('b-send') as HTMLButtonElement;

// Connect to the server (replace with the actual server URL if deployed elsewhere)
const socket = io("ws://localhost:3000");

// Add a new message to the chat display
const addMessage = (text: string, isSystem: boolean) => {
	const messageElement = document.createElement('div');
	messageElement.textContent = text;
	if (isSystem) {
		messageElement.style.fontStyle = 'italic';
		messageElement.style.color = '#555';
	}
	chatWindow.appendChild(messageElement);
	chatWindow.scrollTop = chatWindow.scrollHeight;
};



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
  addMessage(data, true);
});

// Listen for disconnect event
socket.on("disconnect", () => {
  console.log("Disconnected from the server");
    addMessage("Disconnected from the server", true);

});

