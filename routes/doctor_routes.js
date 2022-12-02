const express = require('express');
const Doctor = require('../models/doctor');
const User = require('../models/user');
const bcrypt = require("bcryptjs");
const doctorRouter = express.Router();
const jwt = require("jsonwebtoken");
const { json } = require('express');

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

doctorRouter.post('/api/doctors/insertDoctor', async(req, res) => {
    try {
        console.log("Insert doctor is called");
        const { email, type, description, timeStart, timeFinish, experience } = req.body;
        let doctor = new Doctor({
            email,
            type,
            description,
            timeStart,
            timeFinish,
            experience,
        });
        console.log(doctor.email);
        doctor = await doctor.save();
        res.json(doctor);
    } catch (e) {
        res.status(500).json({ error: e.mesaage });
    }
});
module.exports = doctorRouter;
// const type = "doctor";
// // const authDoctors = await User.findOne({ type });
// const listResponse = [];
// for (let i = 0; i < doctors.length; i++) {
//     let email = doctors[i].email;
//     const user = await User.findOne({ email });
//     let responseItem = {
//         'email': user.email,
//         'name': user.name,
//         'address': user.address,
//         'gender': user.gender,
//         'dateBorn': user.dateBorn,
//         'avt': user.avt,
//         'type': doctors[i].type,
//         'description': doctors[i].description,
//         'timeStart': doctors[i].timeStart,
//         'timeFinish': doctors[i].timeFinish,
//         'experience': doctors[i].experience,

//     };
//     listResponse.push(responseItem);
// }