const Entry = require("../models/entries");

// Get Chat History
exports.getchathistory = function(req, res, next) {
  Entry.find({ roomId: req.params.id })
    .exec()
    .then(chats => {
      res.json({
        data: chats
      });
    })
    .catch(error => {
      throw error;
    });
};
