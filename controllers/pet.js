const { Pet } = require('../models');

const fetchAllPets = async (req, res, next) => {
    try {
        const petCollection = await Pet.findAll();
        res.status(200).send(petCollection);
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

const fetchPetProfile = async (req, res, next) => {
    try{
        const petCollection = await Pet.findByPk(req.params.petId);
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

const createPet = async (req, res, next) => {
    try {
        const { name, avatar, height, weight, dob, petType } = req.body;
        const petCollection = await Pet.create({
            userId: req.user.id,
            name, avatar, height, weight, dob, petType
        });
        res.status(201).send(petCollection);
    }
    catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
}

const updatePet = async (req, res, next) => {
    try{
        const petCollection = await Pet.findByPk(req.params.petId);
        if(petCollection){
            const { name, avatar, height, weight, dob, petType } = req.body;
           const updatedPet = await petCollection.update({
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

const deletePet = async (req, res, next) => {
    try{
        const petCollection = await Pet.findByPk(req.params.petId);
        if(petCollection){
            await petCollection.destroy()
            res.status(204).send(petCollection)
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
