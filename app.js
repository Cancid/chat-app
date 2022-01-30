const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = process.env.PORT || 5000


app.use(express.static("public"));


app.get('/', (request, response) => {
  response.sendFile('/index.html');
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


app.listen(PORT, () => {
  console.log(`Our app is running on port ${ PORT }`);
});