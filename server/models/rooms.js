const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    roomname: String,
    body: String,
    date: String,
    location: Object,
    userId: String
});

module.exports = mongoose.model('rooms', RoomSchema);