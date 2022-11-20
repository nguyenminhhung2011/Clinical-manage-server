const mongoose = require('mongoose');
const ratingSchema = require('./rating');
const doctorSchema = mongoose.Schema({
    email: {
        require: true,
        type: String,
        trim: true,
        validate: {
            validator: (value) => {
                const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                return value.match(re);
            },
            message: 'Please enter a valid email address',
        }
    },
    type: {
        require: true,
        type: String,
        default: "General",
    },
    description: {
        require: true,
        type: String,
        default: "",
    },
    timeStart: {
        require: true,
        type: Number,
        default: 0,
    },
    timeFinish: {
        require: true,
        type: Number,
        default: 0,
    },
    rating: [ratingSchema],
    experience: {
        require: true,
        type: Number,
        default: 0,
    }
});
const Doctor = mongoose.model("doctor", doctorSchema);
module.exports = Doctor;