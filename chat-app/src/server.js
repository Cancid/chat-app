const express = require('express');
const app = express();
const mongoose = require('mongoose');
const mongoDB = 'mongodb+srv://cancid:sFTJ2OliivqMYwAv@cluster0.kjr9u.mongodb.net/chat-app?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const createHttpError = require("http-errors");
const cors = require('cors');
const bodyParser = require("body-parser")
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000"
  },
});
const User = require('./models/user')
const Message = require('./models/message')


app.use(cors({
  origin: 'http://localhost:3000'
}));


app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/register', (request, response) => {
  User.findOne({username: request.body.username }).exec(
    (err, user) => {
      if (user) {
        console.log(user)
        response.status(409).send("Username already exists.");
      } else {
        console.log(request.body)
        const newUser = new User(request.body)
        newUser.save();
        response.send('test1234')
      };
    });
});
    

app.post('/login', (request, response) => {
  response.send(
    'test1234'
  );
});

app.get('/', (request, response) => {
  response.sendFile(__dirname +'/index.html');
});

io.use((socket, next) => {
  const sessionId = socket.handshake.auth.sessionId;
  if (sessionId) {
    const session = sessionStore.findSession(sessionId);
    if (session) {
      socket.sessionId = sessionId;
      socket.userId = session.userId;
      socket.username = session.username;
      return next();
    }
  }
  const username = socket.handshake.auth.username;
  if (!username) {
    console.log('Error connecting to websocket')
    return next(new Error("invalid username"));
  }
  socket.sessiondId = randomId();
  socket.userId = randomId();
  socket.username = username;
  next();
});

io.on('connection', (socket) => {
  console.log('User connected');
  const users = [];
  console.log(io.of('/').sockets)
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userId: id,
      user: socket.username,
    });
    console.log
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
      text: `${socket.username} left the chat!`
    });
  });

  socket.on('chat message', (msg) => {
    console.log("Message recieved...")
    console.log(msg)
    const { user, text } = msg; 
    let chatMessage = new Message({ user, text });
    chatMessage.save();
    io.emit('chat message', { user, text });
  });

  socket.on('join channel', (channelId) => {
    socket.join(channelId);
  });
});


  server.listen(3001, () => {
  console.log(`Our app is running on port 3001`);
});