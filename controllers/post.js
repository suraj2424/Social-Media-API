const Post = require("../models/post");

const handleCreatePost = async (req,res) => {
    try {
        const { userId, desc, img } = req.body;
        const newPost = await Post.create({
            userId : userId,
            desc : desc,
            img : img,
        }).catch(e => res.status(500).json(e));
        res.status(200).json(newPost);

    } catch (error) {
        res.status(403).json(error);
    }
}

const handleGetAllPosts = async (req,res) => {
    const Posts = await Post.find();
    res.status(200).json(Posts);
}

const handleGetPost = async (req,res) => {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    res.status(200).json(post);
}

const handleUpdatePost = async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId) {
            await post.updateOne({ $set : req.body});
            res.status(200).json("Post has been updated");
        }
        else {
            res.status(403).json("You can update only your posts");
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

const handleDeletePost = async (req,res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json("Post has been deleted successfully.");
    }
    catch(e) {
        res.status(500).json(e);
    }
}

const handleLikePost = async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push : { likes: req.body.userId } });
            res.status(200).json("Post has been liked");
        }
        else {
            res.status(403).json("You already liked this post");
        }
    }
    catch(error) {
        res.status(500).json(error);
    }
}

const handleUnlikePost = async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.likes.includes(req.body.userId)){
            await post.updateOne({ $pull: { likes: req.body.userId }});
            res.status(200).json("Post has been disliked successfully.");
        }
        else{
            res.status(403).json("You already disliked this post");
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

const handleGetTimeline = async (req,res) => {
    try {
        const currentUser = await User.findById(req.body.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
            currentUser.followings.map(friendId => {
                Post.find({ userId: friendId});
            })
        );
        res.status(200).json(userPosts.concat(...friendPosts));
    } catch (error) {
        
    }
}

module.exports = { 
    handleCreatePost,
    handleGetAllPosts,
    handleGetPost, 
    handleUpdatePost,
    handleDeletePost,
    handleLikePost,
    handleUnlikePost,
    handleGetTimeline,
};