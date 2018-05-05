exports = module.exports = function (io) {
  // Set socket.io listeners.
  //io.on('connection', (socket) => {
  /*  console.log('a user connected');

  socket.on('add chat', (chat) => {
    console.log('desert shade', chat);
    socket.join(chat.roomId);
    //io.emit('new chat', chat);
    io.sockets.in(chat.roomId).emit('new chat', chat);
  });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });*/
  // attach Socket.io to our HTTP server
//io = io.listen(server);

// handle incoming connections from clients
io.on('connection', function(socket) {
console.log("connected");
    // once a client has connected, we expect to get a ping from them saying what room they want to join
    socket.on('room', function(room) {
      console.log("hulahoop",room);
        socket.join(room);
        socket.on('message', function(message) {
          console.log('frisbee', message)
          io.sockets.in(room).emit('message', message);
        })
    });
    socket.emit("user", "hello world")
});

// now, it's easy to send a message to just the clients in a given room
//room = "abc123";
//io.sockets.in(room).emit('message', 'what is going on, party people?');

// this message will NOT go to the client defined above
//io.sockets.in('foobar').emit('message', 'anyone in this room yet?');
};



