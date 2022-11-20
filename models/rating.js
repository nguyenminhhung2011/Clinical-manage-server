const mongoose = require("mongoose");

const ratingSchema = mongoose.Schema({
    userSend: {
        type: String,
        required: true,
    },
    doctor: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    reviews: {
        required: true,
        type: String,
        default: '',
    },
    like: {
        required: true,
        type: Number,
        default: 0,
    }
});

module.exports = ratingSchema;