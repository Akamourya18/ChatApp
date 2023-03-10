const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//Set static files
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  //Welcome current user
  socket.emit('message', 'Welcome to Lets Chat');

  //Broadcast when a user connects
  socket.broadcast.emit('message', 'A user has joined the chat');

  //Runs when a client disconnects
  socket.on('disconnect', () => {
    io.emit('message', 'A user has left the chat');
  });

  //Listen for chatMessage
  socket.on('chatMessage', (msg) => {
    io.emit('message', msg);
  });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
