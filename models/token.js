const mongoose = require('mongoose');

const tokenSchema = mongoose.Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },
    socketID:{type: String, required: true},
});

const Token = mongoose.model('Token', tokenSchema);
module.exports = Token


