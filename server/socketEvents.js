exports = module.exports = function (io) {
  // Set socket.io listeners.
  io.on('connection', (socket) => {
    console.log('a user connected');

  socket.on('add chat', (chat) => {
    console.log('desert shade', chat);
    io.emit('new chat', chat);
  });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
};
