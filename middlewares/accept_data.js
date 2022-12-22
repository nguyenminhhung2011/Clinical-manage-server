const jwt = require('jsonwebtoken');


const acceptData = async(req, res, next) => {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
}

module.exports = acceptData;