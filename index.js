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

    // let token = socket.handshake.query.token
    // socket.join(token)

    console.log(`New Client connected`);
    console.log(socket.id, "has joined");
    socket.on("/test", (msg) => {
        console.log(msg);
    });
    socket.on('fromClient', data => {
        console.log(data);
        socket.emit('fromServer', `${Number(data) + 1}`)
    },);
    socket.on('verify-success', async data => {
        console.log(data);
        
        let _token = new Token(user._id,data.token,socket.id);
        _token = await _token.save();
        print(_token)

        // socket.in(data.token).emit("verify",{
        //     isVerify : true,
        // });
    },);
    socket.on('finish', data => {
        console.log(data);
        socket.leave(socket.token);
    },);
    
    // socket.emit("fromServer", "connected");
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

// io.on('connection', socket => {
//     //Get the chatID of the user and join in a room of the same chatID
//     chatID = socket.handshake.query.chatID
//     socket.join(chatID)
//     //Leave the room if the user closes the socket
//     socket.on('disconnect', () => {
//         socket.leave(chatID)
//     })
//     //Send message to only a particular user
//     socket.on('send_message', message => {
//         receiverChatID = message.receiverChatID
//         senderChatID = message.senderChatID
//         content = message.content
//         //Send message to only that particular room
//         socket.in(receiverChatID).emit('receive_message', {
//             'content': content,
//             'senderChatID': senderChatID,
//             'receiverChatID':receiverChatID,
//         })
//     })
// });


// io.sockets.on('connection', function (socket) {
//     socket.on('new user', function (name, data) {
//         if (name in users) {
//             data(false);
//         } else {
//             data(true);
//             socket.nickname = name;
//             users[socket.nickname] = socket;
//             console.log('add nickName');
//             updateNickNames();
//         }

//     });

//     function updateNickNames() {
//         io.sockets.emit('usernames', Object.keys(users));
//     }
//     socket.on('open-chatbox', function (data) {
//         users[data].emit('openbox', { nick: socket.nickname });
//     });
//     socket.on('send message', function (data, sendto) {
//         users[sendto].emit('new message', { msg: data, nick: socket.nickname, sendto: sendto });
//         users[socket.nickname].emit('new message', { msg: data, nick: socket.nickname, sendto: sendto });

//         console.log(data);
//     });
//     socket.on('disconnect', function (data) {
//         if (!socket.nickname) return;
//         delete users[socket.nickname];
//         updateNickNames();
//     });
// });