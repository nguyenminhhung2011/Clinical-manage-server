const mongoose = require('mongoose');

const departMentSchema = mongoose.Schema({
    id: {
        required: true,
        type: String,
        trim: true,
    },
    name: {
        required: true,
        type: String,
        trim: true,
    },
});
const DepartMent = mongoose.model('Khoa', departMentSchema);
module.exports = DepartMent;