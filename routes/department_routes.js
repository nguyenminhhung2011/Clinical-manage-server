const express = require('express');
const DepartMent = require('../models/department');
const jwt = require("jsonwebtoken");
const { json } = require('express');
const departMentRouter = express.Router();

departMentRouter.get('/api/departments/getAll', async(req, res) => {
    try {
        console.log("Get all department function is called");
        const departMents = await DepartMent.find();
        res.json(departMents);
    } catch (e) {
        res.status(500).json({ err: e.message });
    }
});



module.exports = departMentRouter;