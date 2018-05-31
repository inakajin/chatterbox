exports = module.exports = function(io) {
  // handle incoming connections from clients
  var users = [];
  io.on("connection", function(socket) {
    socket.on("active", function(data) {
      //saving userId to array with socket ID
      users.push(data);
      socket.broadcast.emit("activeusers", users);
    });

    // once a client has connected, we expect to get a ping from them saying what room they want to join
    socket.on("room", function(data) {
      let room = data.room;
      let user = data.user;
      socket.join(room);
      io.sockets.in(room).emit("userid", user);
      socket.on("message", function(message) {
        let obj = {
          message: message,
          username: data.user.currentUser.username,
          userId: data.user.currentUser.id
        };

        io.sockets.in(room).emit("message", obj);
      });
    });
    socket.emit("user", "hello world");
    socket.on("disconnect", function() {});
  });
};
