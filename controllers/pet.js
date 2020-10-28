const { Pet } = require('../models');

export const fetchAllPets = async (req, res, next) => {
    try {
        const petCollection = await Pet.find({});
        res.status(201).send(petCollection);
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

export const fetchPetProfile = async (req, res, next) => {
    try{
        const petCollection = await Pet.find({
                id : req.params.petId
        });
        if(petCollection){
            res.status(200).send(petCollection)
        }else{
            res.status(404).send("Pet Not Found");
        }
    }catch(e){
        console.log(e);
        res.status(500).send(e);
    }
}

export const createPet = async (req, res, next) => {
    try {
        const { userId, name, avatar, height, weight, dob, petType } = req.body;
        const petCollection = await Pet.create({
            userId, name, avatar, height, weight, dob, petType
        });
        res.status(201).send(petCollection);
    }
    catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
}

export const updatePet = async (req, res, next) => {
    try{
        const petCollection = await Pet.find({
                id : req.params.petId
        });
        if(petCollection){
            const { name, avatar, height, weight, dob, petType } = req.body;
           const updatedPet = await Pet.update({
                name, avatar, height, weight, dob, petType
            });
            res.status(201).send(updatedPet)
        }else{
            res.status(404).send("Pet Not Found");
        }
    }catch(e){
        console.log(e);
        res.status(500).send(e);
    }
 }

export const deletePet = async (req, res, next) => {
    try{
        const petCollection = await Pet.find({
                id : req.params.petId
        });
        if(petCollection){
            Pet.destroy({
                where: { id: req.params.petId }
            })
            res.status(200).send(petCollection)
        }else{
            res.status(404).send("Pet Not Found");
        }
    }catch(e){
        console.log(e);
        res.status(500).send(e);
    }
 }


module.exports = {
    fetchPetProfile,
    fetchAllPets,
    createPet,
    updatePet,
    deletePet,
};
