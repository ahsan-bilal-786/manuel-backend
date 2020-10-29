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
        const eventCollection = await Event.create({
            userId: req.user.id,
            title, startTime, endTime, petId
        });
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
    createEvent,
    updateEvent,
    deleteEvent,
};
