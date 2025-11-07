// client.js

import './style.css'
import  io  from "socket.io-client"
const socket = io("ws://localhost:3000");

const chatWindow = document.getElementById('t-chatbox') as HTMLDivElement;
const sendButton = document.getElementById('b-send') as HTMLButtonElement;
const sendtextbox= document.getElementById('t-chat-window') as HTMLButtonElement;
const blogout = document.getElementById('b-logout') as HTMLButtonElement;
const bwhoami = document.getElementById('b-whoami') as HTMLButtonElement;
const username = document.getElementById('username') as HTMLDivElement;

// Add a new message to the chat display
const addMessage = (text: any, styleText: boolean) => {
	const messageElement = document.createElement('div');
	messageElement.textContent = JSON.stringify(text, null, 2);
	if (styleText) {
		messageElement.style.fontStyle = 'italic';
		messageElement.style.color = '#555';
	}
	chatWindow.appendChild(messageElement);
	chatWindow.scrollTop = chatWindow.scrollHeight;   //puts scroll to the bottom
};

sendButton!.addEventListener('click', async () => {

  let msgtext: string = sendtextbox.value;
  if (msgtext) {
    let user: string = "client: ";
    addMessage(msgtext, true);
    console.log('text:',msgtext);
    socket.emit("message", { message: `${msgtext}`, user: `${user}`, socketid: `${socket.id}` });
    sendtextbox.value = "";
  }
});

blogout!.addEventListener('click', async () => {
  console.log("end server");
  socket.emit("toutou", {end:''});
});

bwhoami!.addEventListener('click', async () => {
  console.log("client_socketID", socket.id);
  let socketid = JSON.stringify(socket.id, null, 2);
  const IDElement = document.createElement('username');
  IDElement.textContent = socketid;
  username.textContent = "";
  username.appendChild(IDElement);
});


// Listen for the 'connect' event
socket.on("connect", async() => {
  console.log("Connected to the server: ", socket.id);
  
  // Send a message to the server
  socket.send("Hello from the client: " + `${socket.id}`);
  
  // Emit a custom event 'coucou' with some data
  
  socket.emit("coucou", { message: "Hello Nigel from coucou!" });
  
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

