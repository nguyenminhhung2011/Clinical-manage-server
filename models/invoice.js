const mongoose = require('mongoose');
const invoiceSchema = mongoose.Schema({

});
const Invoice = mongoose.model('Invoice', invoiceSchema);
module.exports = Invoice;