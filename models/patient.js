const mongoose = require('mongoose');
const patientSchema = mongoose.Schema({
    name: {
        require: true,
        type: String,
        default: "",
    },
    address: {
        require: true,
        type: String,
        default: "",
    },
    gender: {
        require: true,
        type: String,
        default: "",
    },
    dob: {
        require: true,
        type: String,
        default: "",
    },
    phoneNumber: {
        require: true,
        type: String,
        default: "",
    },
    avt: {
        require: true,
        type: String,
        default: "",
    },
    status:{
        require: true,
        type: String,
        default: "",
    },
});
const Patient = mongoose.model("patients", patientSchema);
module.exports = Patient;

