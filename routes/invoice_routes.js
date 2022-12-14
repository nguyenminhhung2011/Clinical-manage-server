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

invoiceRouter.post('/api/invoice/add_invoice_health_record', async(req, res) => {
    try {
        console.log("add invoice health record is called");
        const { thumb, amount, status, createTime, title, hrId, category } = req.body;
        let invoice = new Invoice({
            thumb,
            amount,
            status,
            createTime,
            title,
            hrId,
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


invoiceRouter.post('/api/invoice/delete_invoice', async(req, res) => {
    try {
        console.log("Delete Invoice is called");
        const { id } = req.body;
        let invoice = await Invoice.findByIdAndDelete(id);
        res.json(invoice);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

invoiceRouter.post("/api/invoice/delete_many_invoice", async(req, res) => {
    try {
        console.log("Delete many invoice is called ");
        const { listId } = req.body;
        for (let i = 0; i < listId.length; i++) {
            let iv = await Invoice.findByIdAndDelete(listId[i]);
        }
        res.json({ delete: "Success" });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});
module.exports = invoiceRouter;