const express = require('express');
const Notification = require('../models/notification');
const notificationRouter = express.Router();
const { json } = require('express');
const { sockets } = require('./auth_routes');


notificationRouter.get('/api/notification/get_all', async(req, res) => {
    try {
        console.log('get all notification is called');
        const notification = await Notification.find();
        res.json(notification);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

notificationRouter.post('/api/notification/insert_notification_data', async(req, res) => {
    try {
        console.log("insert notification data is called");
        const { title, time } = req.body;
        let notification = new Notification({
            title,
            time,
        });
        notification = await notification.save();
        for (let value of sockets.values()) {
            await value.socket.emit('serverNotify', { msg: 'newNotification', notification: notification._id, });
        }
        res.json(notification);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});


notificationRouter.get('/api/notification/get_notification_by_id/:id', async(req, res) => {
    try {
        console.log("get notification by id is called");
        const notification = await Notification.findById(req.params.id);
        res.json(notification);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});




module.exports = notificationRouter;