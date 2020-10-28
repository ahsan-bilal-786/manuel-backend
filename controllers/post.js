const { Post } = require('../models');

export const fetchAllPosts = async (req, res, next) => {
    try {
        const postCollection = await Post.find({});
        res.status(201).send(postCollection);
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

export const fetchPost = async (req, res, next) => {
    try{
        const postCollection = await Post.find({
                id : req.params.postId
        });
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

export const createPost = async (req, res, next) => {
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

export const updatePost = async (req, res, next) => {
    try{
        const postCollection = await Post.find({
                id : req.params.postId
        });
        if(postCollection){
            const { description, avatar, profileId, profileType } = req.body;
           const updatedpost = await Post.update({
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

export const deletePost = async (req, res, next) => {
    try{
        const postCollection = await Post.find({
                id : req.params.postId
        });
        if(postCollection){
            Post.destroy({
                where: { id: req.params.postId }
            })
            res.status(200).send(postCollection)
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
