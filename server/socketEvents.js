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
var users = [];
io.on('connection', function(socket) {
console.log("connected");

socket.on('active', function(data){
  console.log('a user ' + data + ' connected');
  //saving userId to array with socket ID
  users.push(data);
  console.log(users);
  socket.broadcast.emit("activeusers", users);
});


//io.of('/room').clients((error, clients => {
//  if (error) throw error;
//  console.log(clients);
//});
    // once a client has connected, we expect to get a ping from them saying what room they want to join
    socket.on('room', function(data) {
      let room = data.room;
      let user = data.user;
      //console.log("hulahoop",room, user, "baseball");
        socket.join(room);
        //io.of('/').in(room).clients((error, clients) => {
        //  if (error) throw error;
        //  console.log(clients);
        //}); 
        io.sockets.in(room).emit('userid', user);
        socket.on('message', function(message) {
          console.log('frisbee', message)
          io.sockets.in(room).emit('message', message);
        })
    });
    socket.emit("user", "hello world")
    socket.on('disconnect', function(){
      console.log('user ' + users[socket.id] + ' disconnected');
    });
});

// now, it's easy to send a message to just the clients in a given room
//room = "abc123";
//io.sockets.in(room).emit('message', 'what is going on, party people?');

// this message will NOT go to the client defined above
//io.sockets.in('foobar').emit('message', 'anyone in this room yet?');
};



