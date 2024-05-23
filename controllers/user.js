const User = require("../models/users");
const { createHmac } = require("node:crypto")

async function handleGetAllUsers(req,res) {
    const users = await User.find();
    res.json(users);
}

async function handleGetUser(req,res) {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {
        console.log("Unexpected error occurred:", error);
        res.status(404).json("User not found");
    }
}

async function handleUserSignUp(req,res) {
    const { username, email, password } = req.body;
    const user = await User.create({
        username : username,
        email : email,
        password : password,
    });
    res.status(200).json(user);
}

async function handleUserLogin(req,res) {
    try {
        const { email, password } = req.body;
        const client = await User.findOne({ email : email });
    
        const salt = client.salt;
        const hash = createHmac('sha256', salt).update(password).digest('hex');

        if(client.password !== hash) {
            return res.status(404).json("User not found, check username/password");
        }
        res.status(200).json(client);
    } catch (error) {
        console.log("Error occurred during login:", error);
        res.status(500).json("An error occurred during login process");
    }
}

async function handleUpdateUser(req,res) {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, {
            $set : req.body,
        });
        res.status(200).json("Account has been updated successfully.");
    } catch (error) {
        console.log("Error occurred during updating the user credentials:", error);
        res.status(404).json("User not found");
    }
}

async function handleDeleteUser(req,res) {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Account has been deleted successfully.");
    } catch (error) {
        console.log("Error occurred during updating the user credentials:", error);
        res.status(404).json("User not found");
    }
}

async function handleFollowings(req,res) {
    if(req.params.id !== req.body.userId){
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if(!user.followers.includes(req.body.userId)){
            await user.updateOne({ $push : { followers : req.body.userId } })
            await currentUser.updateOne({ $push : { followings : req.params.id } })

            res.status(200).json("User has been followed");
        }
        else {
            res.status(403).json("You already follow this account");
        }
    }
}

async function handleUnfollowings(req,res) {
    if(req.params.id !== req.body.userId){
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if(user.followers.includes(req.body.userId)){
            await user.updateOne({ $pull : { followers : req.body.userId } })
            await currentUser.updateOne({ $pull : { followings : req.params.id } })

            res.status(200).json("User has been unfollowe   d");
        }
        else {
            res.status(403).json("You dont follow this account");
        }
    }
    else {
        res.status(403).json("You can't unfollow yourself");
    }
}

module.exports = {
    handleGetUser,
    handleUserSignUp,
    handleGetAllUsers,
    handleUserLogin,
    handleUpdateUser,
    handleDeleteUser,
    handleFollowings,
    handleUnfollowings,
}