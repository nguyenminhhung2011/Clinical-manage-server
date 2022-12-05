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
        default:0.0,
    },
    departmentId:{
        require:true,
        type:String,
        default:"",
    },
    description:{
        require:true,
        type:String,
        default:"",
    },
});

const Service = mongoose.model('service',serviceScheme);
module.exports =Service;

