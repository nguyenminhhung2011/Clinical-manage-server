const express = require('express');
const User = require('../models/user');
const Token = require('../models/token')
const bcrypt = require("bcryptjs");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");

const { json, application } = require('express');
const auth = require("../middlewares/auth_data");
const mailTransporter = require("../middlewares/mail_transport");
const e = require('express');
const JWT_SECRET = "asdfasdfadsfasdfqwerjfzxcv@#$#%@:::::"

let sockets = new Map();

authRouter.post('/api/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User with the same already exisits" });
        }
        const hashedPassword = await bcrypt.hash(password, 8);
        let user = new User({
            email,
            password: hashedPassword,
            name,
        });
        user = await user.save();
        res.json(user);
    } catch (e) {
        res.status(500).json({ err: e.message });
    }
});

authRouter.post('/api/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("hahahah");
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "User is not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Incorrect Pssword" });
        }
        const token = jwt.sign({ id: user._id }, "passwordkey");
        res.json({ token, ...user._doc });
    } catch (e) {
        res.status(500).json({ err: e.message });
    }
});

authRouter.post('/api/changePassword', async (req, res) => {
    try {
        const { email, password, newPassword } = req.body;
        console.log("change password function is called");
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: "User is not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Incorrect Password" });
        } else {
            console.log("password is success");
        }
        const hasedPassword = await bcrypt.hash(newPassword, 8);
        user.password = hasedPassword;
        user = await user.save();
        res.json(user);
    } catch (e) {
        res.status(500).json({ err: e.message });
    }
});

authRouter.post('/api/forgetPassword', async (req, res) => {
    try {
        const { email } = req.body;
        console.log("forget password function is called");
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: "User is not found" });
        }

        const secretKey = JWT_SECRET + user.password

        const payload = {
            email: user.email,
            id: user._id
        }
        const token = jwt.sign(payload, secretKey, { expiresIn: '15m' });
        const link = `http://localhost:5000/api/resetPassword/${user.id}/${token}`;

        console.log(link);

        await mailTransporter(link, email).then(result => console.log('Email sent ... ', result)).catch((error) => console.log(error.message));

        res.json({ isSentLink: true, msg: 'Email Sent ! Please check your email to verify', token: token })


    } catch (e) {
        res.status(500).json({ err: e.message });
    }
});

authRouter.get('/api/resetPassword/:id/:token', async (req, res) => {
    const { id, token } = req.params;

    let user = await User.findById(id);
    if (!user) {
        return res.status(404).json({ msg: "User is not found" });
    }

    const secretKey = JWT_SECRET + user.password;
    try {
        const payload = jwt.verify(token, secretKey);
        if (!payload) {
            res.json({ isVerifySuccessful: false });
        }
        else {
            console.log('here')
            let _token = await Token.findOne({ token: token });
            if (!_token) {
                return res.status(404).json({ msg: "User is not found  Or verify link has expired" });
            }
            console.log('here');
            console.log(_token.socketID);
            let socket = sockets.get(_token.socketID);

            console.log(socket.id);

            socket.emit('verify', 'verified');

            console.log('here')

            await Token.deleteMany({ token: token });
            res.json({ isVerifySuccessful: true });
        }
    } catch (error) {
        res.status(500).json({ msg: e.message });
    }


})

authRouter.post('/api/restorePassword', async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        console.log("restorePassword function is called");
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: "User is not found" });
        }
        const hasedPassword = await bcrypt.hash(newPassword, 8);
        user.password = hasedPassword;
        user = await user.save();
        console.log("Changed password");
        res.json({ isSuccess: true, user: user });
    } catch (e) {
        res.status(500).json({ err: e.message });
    }
});

authRouter.post('/api/editProfile', async (req, res) => {
    try {
        console.log("Edit profile is called");
        const { email, name, gender, phoneNumber, dateBorn, address, avt } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: "User is not found" });
        }
        user.name = name;
        // user.email = email;
        user.gender = gender;
        user.dateBorn = dateBorn;
        user.address = address;
        user.phoneNumber = phoneNumber;
        user.avt = avt;
        user = await user.save();
        res.json(user);
    } catch (e) {
        res.status(500).json({ err: e.message });
    }
});

authRouter.post('/api/updateAvata', async (req, res) => {
    try {
        console.log("update avt is called");
        const { email, image } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: "user is not found" });
        }
        user.avt = image;
        user = await user.save();
        res.json(user);
    } catch (e) {
        res.status(500).json({ err: e.message });
    }
});

authRouter.post('/api/validToken', async (req, res) => {
    try {
        const token = req.header('x-auth-token');
        if (!token) return res.json({ check: false });
        const verified = jwt.verify(token, "passwordkey");
        if (!verified) return res.json({ check: false });

        const user = await User.findById(verified.id);
        if (!user) return res.json(false);
        // res.json(true);
        res.json({ check: true, ...user._doc });
    } catch (e) {
        res.status(500).json({ err: e.message });
    }
});

authRouter.get('/getUser', auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({ ...user._doc, token: req.token });
});


module.exports = { authRouter, sockets };
