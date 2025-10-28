import Fastify from 'fastify'
import {Server } from "socket.io"

const fastify = Fastify({
  logger: true
})

const io = new Server(fastify.server, {
	cors: {
		origin: "*",
	}
})

// Declare a route
fastify.get('/', function (request, reply) {
  reply.send({ hello: 'world' })
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