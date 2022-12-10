const mongoose = require('mongoose');
const clinicalRoomSchema = mongoose.Schema({
    name: {
        require: true,
        type: String,
        default: "",
    },
    reception: {
        require: true,
        type: Number,
        default: 0,
    },
    exmained: {
        require: true,
        type: Number,
        default: 0,
    },
});

const ClinicalRoom = mongoose.model("clinical_room", clinicalRoomSchema);
module.exports = ClinicalRoom;