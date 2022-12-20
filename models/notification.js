const mongoose = require('mongoose');
const notificationSchema = mongoose.Schema({
    title: {
        required: true,
        type: String,
        default: "",
    },
    time: {
        required: true,
        type: Number,
        default: 0,
    },
    check: {
        type: Number,
        default: 0,
    },
});

const Notification = mongoose.model("notification", notificationSchema);
module.exports = Notification;