const express = require('express');
const patientRouter = express.Router();
const Patient = require('../models/patient');
const jwt = require("jsonwebtoken");

const { json, application } = require('express');
const auth = require("../middlewares/auth_data");
const e = require('express');
const JWT_SECRET = "asdfasdfadsfasdfqwerjfzxcv@#$#%@:::::"

patientRouter.post('/api/addPatient/', async (req, res) => {
    try {
        console.log('calling addPatient Route');
        const { name,
            address,
            gender,
            dob,
            phoneNumber,
            email,
            avt,
            status,
            symptom,
        } = req.body;

        let patient = new Patient({
            name,
            address,
            gender,
            dob,
            phoneNumber,
            email,
            avt,
            status,
            symptom,

        });

        let checkPatientExisting = await Patient.find({ name: name, address: address });

        if (!checkPatientExisting) {
            return res.status(404).json({ msg: "Patient existed" });
        }

        patient = await patient.save();
        res.json({ id: patient._id, isSuccess: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


patientRouter.post('/api/deletePatient/', async (req, res) => {
    try {
        console.log('calling deletePatient Route');
        const { patientId } = req.body;

        console.log(patientId);
        let patient = await Patient.findByIdAndRemove(patientId);
        console.log('here');
        if (!patient) {
            return res.status(404).json({ isSuccess: false, msg: "Can not found patient " });
        }

        console.log(patient);

        res.json({ isSuccess: true, patient: { id: patient._id, ...patient._doc } });

    } catch (error) {
        res.status(500).json({ isSuccess: false, error: error.message });
    }
});

patientRouter.get('/api/getAllPatient/', async (req, res) => {
    try {
        console.log('calling getAllPatient Route');

        let patients = await Patient.find();

        if (!patients) {
            return res.status(404).json({ isSuccess: false, msg: "List Patients Empty" });
        }

        res.json({ isSuccess: true, patients });
    } catch (error) {
        res.status(500).json({ isSuccess: false, error: error.message });
    }
});

patientRouter.post('/api/editPatient', async (req, res) => {
    try {
        console.log("editPatient Function is  called");
        const {
            _id,
            name,
            address,
            gender,
            dob,
            phoneNumber,
            email,
            avt,
            status,
            symptom,
            healthRecord,
        } = req.body;

        let patient = await Patient.findById(_id);

        if (!patient) {
            res.status(400).json({ msg: 'Can\'t found the corresponding patient' })
        }
        patient.name = name;
        patient.address = address;
        patient.avt = avt;
        patient.dob = dob;
        patient.email = email;
        patient.gender = gender;
        patient.phoneNumber = phoneNumber;
        patient.status = status;
        patient.symptom = symptom;
        patient.healthRecord = healthRecord;
        patient = await patient.save();

        res.json({ id: patient._id, isSuccess: true });

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

patientRouter.post('/api/editPatientRecord', async (req, res) => {
    try {
        console.log("editPatient Function is  called");
        const {
            _id,
            healthRecord,
        } = req.body;

        let patient = await Patient.findById(_id);

        if (!patient) {
            res.status(400).json({ msg: 'Can\'t found the corresponding patient' })
        }
        patient.healthRecord.push(healthRecord);
        patient = await patient.save();

        res.json({ id: patient._id, isSuccess: true });

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});


patientRouter.post('/api/addPatientRecord', async (req, res) => {
    try {
        console.log("editPatient Function is  called");
        const {
            _id,
            healthRecord,
        } = req.body;

        let patient = await Patient.findById(_id);

        if (!patient) {
            res.status(400).json({ msg: 'Can\'t found the corresponding patient' })
        }
        patient.healthRecord.push(healthRecord);
        console.log(patient.healthRecord);
        patient = await patient.save();

        res.json({ id: patient._id, isSuccess: true });

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

patientRouter.post('/api/deletePatientRecord/', async (req, res) => {
    try {
        console.log('calling deletePatient Route');
        const { _id,
            idHealthRecord, } = req.body;

        console.log(_id);
        let patient = await Patient.findById(_id);
        console.log('here');
        if (!patient) {
            return res.status(404).json({ isSuccess: false, msg: "Can not found patient " });
        }

        for (let i = 0; i < patient.healthRecord.length; i++) {
            if (patient.healthRecord[i] == idHealthRecord) {
                patient.healthRecord.splice(i, 1);
            }
        }
        patient = await patient.save();

        console.log(patient);

        res.json({ isSuccess: true, idHealthRecord:idHealthRecord});

    } catch (error) {
        res.status(500).json({ isSuccess: false, error: error.message });
    }
});


module.exports = { patientRouter };