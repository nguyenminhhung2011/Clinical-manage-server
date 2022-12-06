const mongoose = require('mongoose');
const invoiceSchema = mongoose.Schema({
    thumb: {
        required: true,
        type: String,
        default: "",
        trim: true,
    },
    amount: {
        required: true,
        type: Number,
        default: 0.0,
        trim: true,
    },
    status: {
        required: true,
        type: Number,
        default: 0,
        trim: true,

    },
    createTime: {
        required: true,
        type: Number,
        default: 0,
        trim: true,

    },
    title: {
        required: true,
        type: String,
        default: '',
        trim: true,

    },
    hrId: {
        required: true,
        type: String,
        default: '',
        trim: true,

    },
    medicineId: {
        required: true,
        type: String,
        default: '',
        trim: true,

    },
    category: {
        required: true,
        type: String,
        default: '',
        trim: true,

    },
});
const Invoice = mongoose.model('Invoice', invoiceSchema);
module.exports = Invoice;