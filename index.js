const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth_routes');

const PORT = process.env.PORT || 5000;
const app = express();
const DB = "mongodb+srv://nguyenminhhung:20112002@cluster0.thz1i4g.mongodb.net/?retryWrites=true&w=majority";


app.use(express.json());
app.use(authRouter);

mongoose.connect(DB).then(() => {
        console.log("Connection Successful");
    })
    .catch((e) => {
        console.log(e);
    });


app.listen(PORT, () => {
    console.log(`Connection with port: ${PORT}`);
});


app.get('/', (req, res) => {
    try {
        res.json({ ok: 'oke' });
    } catch (e) {
        res.status(500).json({ err: e.message });
    }
});