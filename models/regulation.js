const mongoose = require('mongoose');

const regulationSchema = mongoose.Schema({
    examinationFee: {
        type: Number,
        required: true,
    },
    maxPatientPerDay: {
        type: Number,
        required: true,
    },
});

const Regulation = mongoose.model('regulation', regulationSchema);
module.exports = Regulation;