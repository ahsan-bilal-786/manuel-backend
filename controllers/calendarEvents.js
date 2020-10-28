const { Event } = require('../models');

export const fetchAllEvents = async (req, res, next) => {
    try {
        const eventCollection = await Event.find({});
        res.status(201).send(eventCollection);
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

export const fetchEvent = async (req, res, next) => {
    try{
        const eventCollection = await Event.find({
                id : req.params.eventId
        });
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


export const createEvent = async (req, res, next) => {
    try {
        const { userId, title, startTime, endTime, petId } = req.body;
        const eventCollection = await Event.create({
            userId, title, startTime, endTime, petId
        });
        res.status(201).send(eventCollection);
    }
    catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
}

export const updateEvent = async (req, res, next) => {
    try{
        const eventCollection = await Event.find({
                id : req.params.petId
        });
        if(eventCollection){
            const { userId, title, startTime, endTime, petId } = req.body;
           const updatedEvent = await Event.update({
                userId, title, startTime, endTime, petId
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

export const deleteEvent = async (req, res, next) => {
    try{
        const eventCollection = await Event.find({
                id : req.params.eventId
        });
        if(eventCollection){
            Event.destroy({
                where: { id: req.params.eventId }
            })
            res.status(200).send(eventCollection)
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
