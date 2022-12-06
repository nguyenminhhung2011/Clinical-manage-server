const express = require('express');
const healthRecordRouter = express.Router();
const HealthRecord = require('../models/healthRecord');
const jwt = require("jsonwebtoken");

const { json, application } = require('express');
const auth = require("../middlewares/auth_data");
const e = require('express');
const { model } = require('mongoose');


healthRecordRouter.post('/api/addHealthRecord', async (req, res) => {
    try {
        const {
            dateCreate,
            totalMoney,
            departmentId,
            note,
            doctorId,
            clinicalExamination,
            symptom,
            diagnostic,
            conclusionAndTreatment,
            weight,
            height,
            heartBeat,
            temperature,
            bloodPressure,
            allergy,
            services,
            medicines,
        } = req.body;

        let healthRecord = new HealthRecord({
            dateCreate,
            totalMoney,
            departmentId,
            note,
            doctorId,
            clinicalExamination,
            symptom,
            diagnostic,
            conclusionAndTreatment,
            weight,
            height,
            heartBeat,
            temperature,
            bloodPressure,
            allergy,
            services,
            medicines,
        });

        healthRecord = await healthRecord.save();

        res.json({ id: healthRecord._id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

healthRecordRouter.post('/api/deleteHealthRecord/', async (req, res) => {
    try {
        console.log('calling deleteHealthRecord Route');
        const { healthRecordId } = req.body;

        console.log(healthRecordId);
        let healthRecord = await HealthRecord.findByIdAndRemove(healthRecordId);
        console.log('here');
        if (!healthRecord) {
            return res.status(404).json({ isSuccess: false, msg: "Can not found corresponding record" });
        }

        console.log(healthRecord);

        res.json({ isSuccess: true, healthRecord: { id: healthRecord._id, ...healthRecord._doc } });

    } catch (error) {
        res.status(500).json({ isSuccess: false, error: error.message });
    }
});

healthRecordRouter.get('/api/getAllHealthRecord', async (req, res) => {
    try {
        console.log('calling getAllHealthReportDta Route');

        let healthRecords = await HealthRecord.find();

        if (!healthRecords) {
            return res.status(404).json({ isSuccess: false, msg: "List Health Record Empty" });
        }

        res.json({ isSuccess: true, healthRecords: healthRecords });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

healthRecordRouter.post('/api/editHealthRecord', async (req, res) => {
    try {
        console.log("editHealthRecord Function is  called");
        const {
            id,
            dateCreate,
            totalMoney,
            departmentId,
            note,
            doctorId,
            clinicalExamination,
            symptom,
            diagnostic,
            conclusionAndTreatment,
            weight,
            height,
            heartBeat,
            temperature,
            bloodPressure,
            allergy,
            services,
            medicines,
        } = req.body;

        let healthRecord = await HealthRecord.findById(id);

        if (!healthRecord) {
            res.status(400).json({ msg: 'Can\'t found the corresponding healthRecord' })
        }

        healthRecord.dateCreate = dateCreate;
        healthRecord.totalMoney = totalMoney;
        healthRecord.departmentId = departmentId;
        healthRecord.note = note;
        healthRecord.doctorId = doctorId;
        healthRecord.clinicalExamination = clinicalExamination;
        healthRecord.symptom = symptom;
        healthRecord.diagnostic = diagnostic;
        healthRecord.conclusionAndTreatment = conclusionAndTreatment;
        healthRecord.weight = weight;
        healthRecord.height = height;
        healthRecord.heartBeat = heartBeat;
        healthRecord.temperature = temperature;
        healthRecord.bloodPressure = bloodPressure;
        healthRecord.allergy = allergy;
        healthRecord.services = services;
        healthRecord.medicines = medicines;

        healthRecord = await healthRecord.save();

        res.json({ id: healthRecord._id, isSuccess: true });

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = healthRecordRouter;

