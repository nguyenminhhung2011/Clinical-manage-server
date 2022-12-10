const express = require('express');
const { json } = require('express');
const ClinicalRoom = require('../models/clinicalRoom');
const clinicalRoomRoutes = express.Router();

clinicalRoomRoutes.get('/api/clinical_room/get_all', async(req, res) => {
    try {
        console.log("get all clinical room is called");
        const cr = await ClinicalRoom.find();
        res.json(cr);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

clinicalRoomRoutes.post('/api/clinical_room/insert', async(req, res) => {
    try {
        console.log("insert clinical room is called");
        const { name, reception, exmained } = req.body;
        let cr = new ClinicalRoom({
            name,
            reception,
            exmained,
        });
        cr = await cr.save();
        res.json(cr);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

clinicalRoomRoutes.post('/api/clinical_room/delete_room', async(req, res) => {
    try {
        console.log("delete clinical room is called");
        const { id } = req.body;
        let cr = await ClinicalRoom.findByIdAndDelete(id);
        res.json(cr);

        res.json(cr);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

clinicalRoomRoutes.post('/api/clinical_room/edit_room', async(req, res) => {
    try {
        console.log("edit room function is called");
        const { id, name, reception, exmained } = req.body;
        let cr = await ClinicalRoom.findById(id);
        cr.name = name;
        cr.reception = reception;
        cr.exmained = exmained;

        res.json(cr);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});


module.exports = clinicalRoomRoutes;