const moment = require('moment');
const { Op } = require('sequelize')
const { Event } = require('../models');

const fetchAllEvents = async (req, res, next) => {
    try {
        const eventCollection = await Event.findAll();
        res.status(200).send(eventCollection);
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

const fetchUserEvents = async (req, res, next) => {
    try {
        const eventCollection = await Event.findAll({
            where: {
                userId: req.user.id,
                startTime: {
                   [Op.gte]: moment(req.params.midDate, "YYYY-MM-DD").subtract(15, 'days').toDate()
                },
                endTime: {
                   [Op.lte]: moment(req.params.midDate, "YYYY-MM-DD").add(15, 'days').toDate()
                }
            }
        });
        res.status(200).send(eventCollection);
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

const fetchEvent = async (req, res, next) => {
    try{
        const eventCollection = await Event.findByPk(req.params.eventId);
        if(eventCollection){
            res.status(200).send(eventCollection)
        }else{
            res.status(404).send("Event Not Found");
        }
    }catch(e){
        console.log(e);
        res.status(500).send(e);
    }
}


const createEvent = async (req, res, next) => {
    try {
        const { title, startTime, endTime, petId } = req.body;
        const payload = {
            userId: req.user.id,
            title,
            startTime,
            endTime,
            petId: 1
        }
        const eventCollection = await Event.create(payload);
        res.status(201).send(eventCollection);
    }
    catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
}

const updateEvent = async (req, res, next) => {
    try{
        const eventCollection = await Event.findByPk(req.params.eventId);
        if(eventCollection){
            const { title, startTime, endTime, petId } = req.body;
           const updatedEvent = await eventCollection.update({
                title, startTime, endTime, petId
            });
            res.status(201).send(updatedEvent)
        }else{
            res.status(404).send("Event Not Found");
        }
    }catch(e){
        console.log(e);
        res.status(500).send(e);
    }
 }

const deleteEvent = async (req, res, next) => {
    try{
        const eventCollection = await Event.findByPk(req.params.eventId);
        if(eventCollection){
            eventCollection.destroy();
            res.status(204).send(eventCollection)
        }else{
            res.status(404).send("Event Not Found");
        }
    }catch(e){
        console.log(e);
        res.status(500).send(e);
    }
 }


module.exports = {
    fetchEvent,
    fetchAllEvents,
    fetchUserEvents,
    createEvent,
    updateEvent,
    deleteEvent,
};
