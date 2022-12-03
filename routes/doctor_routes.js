const express = require('express');
const Doctor = require('../models/doctor');
const User = require('../models/user');
const bcrypt = require("bcryptjs");
const doctorRouter = express.Router();
const jwt = require("jsonwebtoken");
const { json } = require('express');
const admin = require("../middlewares/admin_data");


doctorRouter.get('api/doctor/getTop', async(req, res) => {
    try {

    } catch (e) {
        res.status(500).json({ err: e.mesaage });
    }
});

doctorRouter.get('api/doctor/getDoctorInfo/:emailDoctor', async(req, res) => {
    try {
        console.log("Get to info doctor");
    } catch (e) {
        res.status(500).json({ error: e.mesaage });
    }
});

doctorRouter.get('/api/doctors/getAll', async(req, res) => {
    try {
        console.log("Get all doctor");
        const doctors = await Doctor.find();
        res.json(doctors);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

doctorRouter.get('/api/doctors/getAllReviews/:emailDoctor', async(req, res) => {
    try {
        console.log("Get all reviews");
        const doc = await Doctor.findOne({ email: req.params.emailDoctor });
        let reviews = [];
        for (let i = 0; i < doc.rating.length; i++) {
            let user = await User.findOne({ email: doc.rating[i].userSend });
            reviews.push({
                'userSend': doc.rating[i].userSend,
                'doctor': doc.rating[i].doctor,
                'rating': doc.rating[i].rating,
                'reviews': doc.rating[i].reviews,
                'like': doc.rating[i].like,
                'image': user.avt,
                'name': user.name,
            });
        }
        res.json(reviews);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

doctorRouter.get('/api/doctors/doctorDetail/:emailDoctor', async(req, res) => {
    try {
        console.log("Get doctor detail");
        const doc = await Doctor.findOne({ email: req.params.emailDoctor });
        const user = await User.findOne({ email: req.params.emailDoctor });
        res.json(doc);

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

doctorRouter.post('/api/doctors/addReview', async(req, res) => {
    try {
        console.log("add reviews is called");
        const { userSend, doctor, rating, reviews } = req.body;
        let doc = await Doctor.findOne({ email: doctor });
        const user = await User.findOne({ email: userSend });
        const ratingSchema = {
            userSend,
            doctor,
            rating,
            reviews,
        };

        doc.rating.push(ratingSchema);
        doc = await doc.save();
        res.json({
            'userSend': userSend,
            'doctor': doctor,
            'rating': rating,
            'reviews': reviews,
            'like': 0,
            'image': user.avt,
            'name': user.name,
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

doctorRouter.post('/api/doctors/deleteDoctor', async(req, res) => {
    try {
        console.log("Delete Doctor function is called");
        const { id } = req.body;
        // let docc = await Doctor.findById(id);
        // let user = await User.findOneAndDelete({ email: docc.ema });
        let doc = await Doctor.findByIdAndDelete(id);
        res.json(doc);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// doctorRouter.post('/')

doctorRouter.get('/api/doctors/searchDoctor/:name', async(req, res) => {
    try {
        console.log("Search Doctor function is called");
        const doctors = await Doctor.find({
            name: { $regex: req.params.name, $options: "i" },
        });
        res.json(doctors);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});


doctorRouter.post('/api/doctors/insertDoctor', async(req, res) => {
    try {
        console.log("Insert doctor is called");
        const { name, address, avt, dateBorn, departMent, experience, iDBS, phoneNumber, description, email, password, } = req.body;
        let doctor = new Doctor({
            iDBS,
            name,
            address,
            dateBorn,
            phoneNumber,
            avt,
            departMent,
            description,
            experience,
        });
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "Doctor with the same already exisits" });
        }
        const hashedPassword = await bcrypt.hash(password, 8);
        let user = new User({
            email,
            password: hashedPassword,
            name,
            type: "Doctor",
            phoneNumber: phoneNumber,
            avt: avt,
            address: address,
            dateBorn: dateBorn,
        });
        user = await user.save();
        doctor = await doctor.save();
        res.json(doctor);
    } catch (e) {
        res.status(500).json({ error: e.mesaage });
    }
});
module.exports = doctorRouter;