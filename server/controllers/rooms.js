const Room = require("../models/rooms");

// Create New Room
exports.createRoom = function(req, res, next) {
  let room = new Room(req.body);
  room["userId"] = req.user.id;
  room.save((err, doc) => {
    if (err) throw err;
    return res.json({
      data: doc
    });
  });
};

exports.getRooms = function(req, res, next) {
  Room.find()
    .exec()
    .then(rooms => {
      res.json({
        data: rooms
      });
    })
    .catch(error => {
      throw error;
    });
};
