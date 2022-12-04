const mongoose = require('mongoose');
const medicineSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        default: "",
    },
    thumbnails: {
        required: true,
        type: String,
        default: "",
    },
    price: {
        required: true,
        type: Number,
        default: 0.0,
    },
    cost: {
        required: true,
        type: Number,
        default: 0.0,
    },
    type: {
        required: true,
        type: String,
        default: "",
    },
    description: {
        required: true,
        type: String,
        default: "",
    },
    unit: {
        required: true,
        type: String,
        default: "",
    },
    amount: {
        required: true,
        type: Number,
        default: "",
    },
});

const Medicine = mongoose.model("medicine", medicineSchema);
module.exports = Medicine;