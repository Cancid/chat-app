const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000"
  }
});
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000'
}));

// app.use(express.static(path.join(__dirname, '/')))
app.use('/login', (request, response) => {
  response.send(
    'test1234'
  )
})

app.get('/', (request, response) => {
  response.sendFile(__dirname +'/index.html');
});


io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.username = username;
  next();
});

io.on('connection', (socket) => {
  console.log('User connected')
  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      // userID: id,
      user: socket.username,
    });
  }
  io.emit("users", users);

  // socket.broadcast.emit('userJoined', socket.username);

  io.emit('connection', 'A user has connected');

  // // eslint-disable-next-line no-unused-vars
  // socket.on('disconnect', (_reason) => {
  //   io.emit('userDisconnect', 'A user has disconnected')
  // });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

  server.listen(3001, () => {
  console.log(`Our app is running on port 3001`);
});