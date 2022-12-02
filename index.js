const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth_routes');
const doctorRouter = require('./routes/doctor_routes');
const Token = require('./models/token');
const PORT = process.env.PORT || 5000;
const app = express();
var server = require('http').createServer(app);
const io = require('socket.io')(server);
const DB = "mongodb+srv://nguyenminhhung:20112002@cluster0.thz1i4g.mongodb.net/?retryWrites=true&w=majority";

app.use(express.json());
app.use(authRouter);
app.use(doctorRouter);

io.on("connection", (socket) => {
    socket.listen()
    console.log(`New Client connected`);
    console.log(socket.id, "has joined");
    console.log(socket.handshake.query.test);
    socket.on("/test", (msg) => {
        console.log("Calling Test");
        console.log(msg);
    });
    socket.on('fromClient', data => {
        console.log(data);
        socket.emit('fromServer', `${Number(data) + 1}`)
    },);
    socket.on('verify-success', async data => {
        console.log(data.token);
        let _token = new Token({token:data.token,socketID:socket.id});
        _token = await _token.save();
        console.log(_token)
    },);
    socket.on('finish', data => {
        console.log(data);
        socket.leave(socket.token);
    },);
});



mongoose.connect(DB).then(() => {
    console.log("Connection Database Successful");
})
    .catch((e) => {
        console.log(e);
    });

server.listen(PORT, () => {
    console.log(`Connection with port: ${PORT}`);
});


module.exports =  io