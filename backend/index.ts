import Fastify from 'fastify'
import { Server } from "socket.io"
import path from 'path'
import fastifyStatic from '@fastify/static'
import fs from 'fs/promises'


import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fastify = Fastify({
  logger: true
})

fastify.register(fastifyStatic, {
  root: path.join(__dirname, ''), prefix: '/'
})


const io = new Server(fastify.server, {
	cors: {
		origin: "*",
  }
})




// Declare a route
// fastify.get('/chat/', async function (request: any, reply: any) {
//  try {
// 		const filePath = path.join('../frontend/', 'index.html');
// 		const fileContent = await fs.readFile(filePath, 'utf-8');
// 		reply.type('text/html').send(fileContent);
// 	}
// 	catch (err) {
// 		console.error('Error loading index.html:', err);
// 		reply.code(500).send('Error loading index.html');
// 	}
// })



io.on("connection", (socket: any) => {
  console.log("testing")
  console.log(`Client connected: ${socket.id}`);
	socket.on("message", (data: any) => console.log(data, `socketID: ${socket.id}`));
	socket.once("message", () => socket.send("connected succesfully"));
	socket.once("coucou", (data: any) => console.log(data))
  const clientIP = socket.handshake.address;
  socket.on("toutou", async() => await closeServer());
  // Broadcast to everyone except the sender
  // socket.broadcast.emit('message', (data: any) => { from: socket.id, data });
  socket.on("message", (data: any) => broadcast(data, socket));

});



function broadcast(message: any, sender?: any) {
  for (const [id, socket] of io.sockets.sockets) {
    if (socket !== sender) {
      socket.emit("message", message);
    }
  }
}



async function closeServer() {
  try {
    console.log('Server is stopping gracefully.');
    io.close();
    console.log('done !');
  } catch (err) {
    console.error('Error stopping server:', err);
  }
};

// Run the server!
fastify.listen({ port: 3000 }, function (err: any, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
});

