const { Pet } = require('../models');

const fetchAllPets = async (req, res, next) => {
    try {
        const petCollection = await Pet.findAll({
            where: {
              userId: req.user.id
            }
          });
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
        
        let avatar = '';
        if (req.file && req.file.filename) {
            avatar =  `/uploads/${req.file.filename}`;
        }        
        const { name, height, weight, dob, petType } = req.body;

        const payload = {
            userId: req.user.id,
            dob: dob,
            name, avatar, height, weight,  petType, avatar
        }
        const petCollection = await Pet.create(payload);
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
            let avatar = petCollection.avatar;
            if (req.file && req.file.filename) {
                avatar =  `/uploads/${req.file.filename}`;
            }        
            const { name, height, weight, dob, petType } = req.body;
           const updatedPet = await petCollection.update({
                name, height, weight, dob, petType, avatar
            });
            res.status(201).send(updatedPet)
        }else{
            res.status(500).send("Pet Not Found");
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
