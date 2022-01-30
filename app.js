const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = process.env.PORT || 5000

console.log(__dirname)

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/index.html')
});

io.on('connection', (socket) => {
  io.emit('connection', 'A user has connected');
  // eslint-disable-next-line no-unused-vars
  socket.on('disconnect', (reason) => {
    io.emit('userDisconnect', 'A user has disconnected')
  });

  socket.on('chat message', (msg) => {
    socket.broadcast.emit('chat message', msg);
  });

  socket.on('login', (user) => {
    socket.broadcast.emit('userJoined', user);
  })
});


server.listen(3000, () => {
  console.log(PORT, () => console.log(`Listening on ${ PORT }`));
});
