# Etape pour installer socket.io dans fastify

1. creeer le server fastify
2. creer le server socket.io et au lieu de lui passer un port avec un server que tu cree avec node http, tu passe fastify.server et c'est tout
3. faire le listen du server fatify et aussi les event socket  ```ts
    const io = new Server();
    io.on("connection",(socket) => {
        blabla
        socket.on("blabla", () => blabla)
        blabla
    }
```)


server testSockets : https://piehost.com/socketio-tester