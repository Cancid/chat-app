const express = require('express');
const app = express();
var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://cancid:sFTJ2OliivqMYwAv@cluster0.kjr9u.mongodb.net/chat-app?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require('cors');
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000"
  },
});

app.use(cors({
  origin: 'http://localhost:3000'
}));

// app.use(express.static(path.join(__dirname, '/')))
app.use('/login', (request, response) => {
  response.send(
    'test1234'
  );
});

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
  console.log('User connected');
  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userId: id,
      user: socket.username,
    });
  }
  io.emit("users", users);

  socket.broadcast.emit('user joined', { 
    user: '',
    text:  `${socket.username} joined the chat!` 
  });

  io.emit('connection', 'A user has connected');

  // eslint-disable-next-line no-unused-vars
  socket.on('disconnect', (_reason) => {
    io.emit('userDisconnect', { 
      user: '',
      text:  `${socket.username} left the chat!`
    });
  });

  socket.on('chat message', (msg) => {
    const { user, text } = msg;    
    console.log(msg.room);
    io.to(msg.room).emit('chat message', { user, text });
  });

  socket.on('join channel', (channelId) => {
    socket.join(channelId);
  });
});


  server.listen(3001, () => {
  console.log(`Our app is running on port 3001`);
});