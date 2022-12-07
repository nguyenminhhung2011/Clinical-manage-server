const express = require('express');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const invoiceRouter = express.Router();
const { json } = require('express');
const Invoice = require('../models/invoice')


invoiceRouter.get('/api/invoice/get_all', async(req, res) => {
    try {
        console.log("fecth all data invoice is called");
        const invoice = await Invoice.find();
        res.json(invoice);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});


invoiceRouter.post('/api/invoice/add_invoice_medicine', async(req, res) => {
    try {
        console.log("add invoice medicine is called");
        const { thumb, amount, status, createTime, title, medicineId, category } = req.body;
        let invoice = new Invoice({
            thumb,
            amount,
            status,
            createTime,
            title,
            medicineId,
            category,
        });
        invoice = await invoice.save();
        res.json(invoice);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});


invoiceRouter.post('/api/invoice/change_status_invoice', async(req, res) => {
    try {
        console.log("chage status incvoice is called");
        const { id, status } = req.body;
        let invoice = await Invoice.findById(id);
        invoice.status = status;
        invoice = await invoice.save();
        res.json(invoice);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = invoiceRouter;