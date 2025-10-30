import Fastify from 'fastify'
import {Server } from "socket.io"
import path from 'path'
import fastifyStatic from '@fastify/static'


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
fastify.get('/', function (request, reply) {
  reply.send("Hello root page:");
})

// Run the server!
fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})

io.on("connection", (socket) => {
	console.log("testing")
	socket.on("message", (data) => console.log(data))
	socket.once("message", () => socket.send("connected succesfuly"));
	socket.once("coucou", (data) => console.log(data))
})