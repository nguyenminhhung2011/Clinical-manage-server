const mongoose = require('mongoose');

const serviceScheme = mongoose.Schema({
    name:{
        require:true,
        type:String,
        default:"",
    },
    price:{
        require:true,
        type:Number,
        default:"",
    },
    departmentId:{
        require:true,
        type:String,
        default:"",
    },
});

const Service = mongoose.model('service',serviceScheme);
module.exports =Service;

