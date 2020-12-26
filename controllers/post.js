const { Post } = require('../models');

const fetchAllPosts = async (req, res, next) => {
    try {
        const postCollection = await Post.findAll();
        res.status(200).send(postCollection);
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

const fetchAllUserPosts = async (req, res, next) => {
    try {
        const postCollection = await Post.findAll({
            where: {
                profileId: req.user.id,
                profileType: 'user'
            }
        });
        res.status(200).send(postCollection);
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}


const fetchAllPetPosts = async (req, res, next) => {
    try {
        const postCollection = await Post.findAll({
            where: {
                profileId: req.params.petId,
                profileType: 'pet'
            }
        });
        res.status(200).send(postCollection);
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}


const fetchPost = async (req, res, next) => {
    try{
        const postCollection = await Post.findByPk(req.params.postId);
        if(postCollection){
            res.status(200).send(postCollection)
        }else{
            res.status(404).send("Post Not Found");
        }
    }catch(e){
        console.log(e);
        res.status(500).send(e);
    }
}

const createPost = async (req, res, next) => {
    try {
        const { description, profileType } = req.body;

        const avatar = req.file.filename ? `/uploads/${req.file.filename}` : "";
        const profileId = profileType === 'user' ? req.user.id : req.body.profileId;
        const postCollection = await Post.create({
            description, avatar, profileId, profileType
        });
        res.status(201).send(postCollection);
    }
    catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
}

const updatePost = async (req, res, next) => {
    try{
        const postCollection = await Post.findByPk(req.params.postId);
        if(postCollection){
            const { description } = req.body;
           const updatedpost = await postCollection.update({
                description
            });
            res.status(200).send(updatedpost)
        }else{
            res.status(404).send("Post Not Found");
        }
    }catch(e){
        console.log(e);
        res.status(500).send(e);
    }
 }

const deletePost = async (req, res, next) => {
    try{
        const postCollection = await Post.findByPk(req.params.postId);
        if(postCollection){
            postCollection.destroy();
            res.status(204).send(postCollection)
        }else{
            res.status(404).send("Post Not Found");
        }
    }catch(e){
        console.log(e);
        res.status(500).send(e);
    }
 }


module.exports = {
    fetchPost,
    fetchAllPosts,
    fetchAllUserPosts,
    fetchAllPetPosts,
    createPost,
    updatePost,
    deletePost,
};
