const router = require('express').Router();

const { handleCreatePost, handleGetAllPosts, handleGetPost, handleUpdatePost, handleDeletePost, handleLikePost, handleUnlikePost, handleGetTimeline } = require('../controllers/post');

// create post
router.post("/", handleCreatePost)
// read post
router.get("/:id", handleGetPost);
// read all posts
router.get("/", handleGetAllPosts);
// update post
router.put("/:id", handleUpdatePost)
// delete post
router.delete("/:id", handleDeletePost);
// like post
router.put("/:id/like", handleLikePost);
// unlike post
router.put("/:id/unlike", handleUnlikePost);

// timeline of posts
router.get("/timeline/all", handleGetTimeline);

module.exports = router;