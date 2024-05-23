const express = require('express');
const { 

    handleUserSignUp, 
    handleGetAllUsers, 
    handleUserLogin, 
    handleUpdateUser, 
    handleDeleteUser, 
    handleGetUser, 
    handleFollowings, 
    handleUnfollowings, 

} = require('../controllers/user');

const router = express.Router();

router.get("/:id", handleGetUser);

router.get("/", handleGetAllUsers);

router.post("/", handleUserSignUp);

router.post("/login", handleUserLogin);

router.put("/:id", handleUpdateUser);

router.delete("/:id", handleDeleteUser);

router.put("/:id/follow", handleFollowings);

router.put("/:id/unfollow", handleUnfollowings);

module.exports = router;