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
        const { description, avatar, profileId, profileType } = req.body;
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
            const { description, avatar, profileId, profileType } = req.body;
           const updatedpost = await postCollection.update({
                description, avatar, profileId, profileType
            });
            res.status(201).send(updatedpost)
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
    createPost,
    updatePost,
    deletePost,
};
