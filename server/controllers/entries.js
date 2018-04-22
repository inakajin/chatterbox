//import { error } from 'util';

const Entry = require('../models/entries');

// Get Chat History
exports.getchathistory = function(req, res, next) {
    Entry.find().exec().then(chats => {
        res.json({
            data: chats
        })
    }).catch(error => {
        throw error;
    })
}





