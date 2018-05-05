//import { error } from 'util';

//import { error } from 'util';

const Room = require('../models/rooms');

// Create New Room
exports.createRoom = function(req, res, next) {
    console.log('sweet potato');
    let room = new Room(req.body);
    room['userId'] = req.user.id;
    room.save((err, doc) => {
        console.log(doc)
        if (err) throw err
        return res.json({
            data: doc
         });
     });    
};

exports.getRooms = function(req, res, next) {
    console.log("yam");
    Room.find().exec().then(rooms => {
        res.json({
            data: rooms
        })
    }).catch(error => {
        throw error;
    }) 
};





