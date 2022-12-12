const express = require('express');
const serviceRouter = express.Router();
const Service = require('../models/service');
const jwt = require("jsonwebtoken");

serviceRouter.get('/api/service/getAllServicesData', async (req, res) => {
    try {
        const services = await Service.find();
        res.json({services: services});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

serviceRouter.post('/api/service/addService', async (req, res) => {
    try {
        console.log('Calling addService');
        const { name,price,departmentId,description} = req.body;
        const tempService = await Service.find({name:name,departmentId:departmentId});
        if (tempService){
            res.status(400).json({isSuccess:false,msg:"Service in this department existed"});
        }
        
        let service = new Service({name,price,departmentId,description});
        service = await service.save();
        
        res.json({isSuccess:true,id:service._id});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})



module.exports = serviceRouter;
