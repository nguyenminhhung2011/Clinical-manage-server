const express = require('express');
const bcrypt = require("bcryptjs");
const { json } = require('express');
const regulationRouter = express.Router();
const Regulation = require('../models/regulation');

regulationRouter.get('/api/regulation/get', async(req, res) => {
    try {
        console.log("get regulation");
        const regulation = await Regulation.find();
        res.json(regulation);

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

regulationRouter.post('/api/regulation/edit', async(req, res) => {
    try {
        console.log("edit regualation is called");
        const { id, examinationFee, maxPatientPerDay } = req.body;
        let regulation = await Regulation.findById(id);
        regulation.examinationFee = examinationFee;
        regulation.maxPatientPerDay = maxPatientPerDay;
        regulation = await regulation.save();
        res.json(regulation);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});


module.exports = regulationRouter;