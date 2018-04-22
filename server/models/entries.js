const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EntrySchema = new Schema({
    body: String,
    date: String,
    location: Object,
    userId: String
});

module.exports = mongoose.model('Entry', EntrySchema);