const mongoose = require("mongoose");
const { createHmac, randomBytes } = require("node:crypto");

const postSchema = new mongoose.Schema({
    userId : {
        type : String,
        required: true,
    },
    desc : {
        type : String,
        max : 500,
    },
    img : {
        type: String,
    },
    likes : {
        type : Array,
        default : [],
    }
}, { timestamps: true });


const Post = mongoose.model("post",postSchema);

module.exports = Post;