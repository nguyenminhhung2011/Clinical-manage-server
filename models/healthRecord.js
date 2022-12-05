const mongoose = require('mongoose');

const healthRecordSchema = mongoose.Schema({
    dateCreate: {
        require: true,
        type: Date,
        default: Date.now(),
    },
    totalMoney: {
        require: true,
        type: Number,
        default: 0,
    },

    department: {
        require: true,
        type: String,
        default: ""
    },

    note: {
        require: false,
        type: String,
        default: ""
    },

    doctorId: {
        require: true,
        type: String,
        default: "",
    },

    clinicalExamination: {
        require: true,
        type: String,
        default: "",
    },
    symptom: {
        require: true,
        type: String,
        default: "",
    },

    diagnostic: {
        require: true,
        type: String,
        default: "",
    },

    conclusionAndTreatment: {
        require: true,
        type: String,
        default: "",
    },

    weight: {
        require: true,
        type: Number,
        default: 0,
    },

    height: {
        require: true,
        type: Number,
        default: 0,
    },
    heartBeat: {
        require: true,
        type: Number,
        default: 0,
    },

    temperature: {
        require: true,
        type: Number,
        default: 0,
    },
    bloodPressure:{
        require:true,
        type:Number,
        default:0,
    },
    allergy:{
        require:false,
        type:String,
        default:"",
    },
    services: [
        {
            service:{
                require:true,
                type:String,
            },
            quantity: {
                require:true,
                type:Number,
            },
        }
    ]
})

const HealthRecord = mongoose.model("healthRecord",healthRecordSchema);
module.exports = HealthRecord;

