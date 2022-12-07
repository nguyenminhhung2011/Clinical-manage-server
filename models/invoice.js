const mongoose = require('mongoose');
const invoiceSchema = mongoose.Schema({
    thumb: {
        required: true,
        type: String,
        default: "",
    },
    amount: {
        required: true,
        type: Number,
        default: 0.0,
    },
    status: {
        required: true,
        type: Number,
        default: 0,

    },
    createTime: {
        required: true,
        type: Number,
        default: 0,

    },
    title: {
        required: true,
        type: String,
        default: '',

    },
    hrId: {
        type: String,
        default: '',

    },
    medicineId: {
        type: String,
        default: '',

    },
    category: {
        required: true,
        type: String,
        default: '',

    },
});
const Invoice = mongoose.model('invoice', invoiceSchema);
module.exports = Invoice;