const express = require('express');
const mongoose = require('mongoose');

///////////////////////////////////ROUTER///////////////////////////////////
const { authRouter, sockets } = require('./routes/auth_routes');
const { patientRouter } = require('./routes/patient_routes');
const doctorRouter = require('./routes/doctor_routes');
const departMentRouter = require('./routes/department_routes');
const medicineRouter = require('./routes/medicine_routes');
const invoiceRouter = require('./routes/invoice_routes');
const healthRecordRouter = require('./routes/healthRecord_routes');
const serviceRouter = require('./routes/service_routes')
const clinicalRoomRouter = require('./routes/clinical_room_routes');
const regulationRouter = require('./routes/regulation_routes');

///////////////////////////////////LIBRARY///////////////////////////////////
const Token = require('./models/token');
const PORT = process.env.PORT || 5000;
const app = express();
var server = require('http').createServer(app);
const io = require('socket.io')(server);
const DB = "mongodb+srv://nguyenminhhung:20112002@cluster0.thz1i4g.mongodb.net/?retryWrites=true&w=majority";


app.use(express.json());
app.use(authRouter);
app.use(doctorRouter);
app.use(departMentRouter);
app.use(patientRouter);
app.use(medicineRouter);
app.use(invoiceRouter);
app.use(clinicalRoomRouter);
app.use(regulationRouter);

io.on("connection", (socket) => {
    console.log(socket.id, "has joined");
    console.log(socket.handshake.query);

    sockets.set(socket.id, { socket: socket, userType: socket.handshake.query.userType, });

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
        let _token = new Token({ token: data.token, socketID: socket.id });
        _token = await _token.save();
        console.log(_token)
    },);

    socket.on('finish', data => {
        console.log(data);
        socket.leave(socket.token);
    },);
    
    socket.on('disconnect socket', data => {
        console.log('disconnect socket');
        socket.leave();
       
        socket.disconnect();
    },);
});

app.use(express.json());
app.use(authRouter);
app.use(doctorRouter);
app.use(healthRecordRouter)
app.use(serviceRouter)


mongoose.connect(DB).then(() => {
    console.log("Connection Database Successful");

})
    .catch((e) => {
        console.log(e);
    });

server.listen(PORT, () => {
    console.log(`Connection with port: ${PORT}`);
});