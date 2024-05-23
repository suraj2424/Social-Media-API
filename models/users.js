const mongoose = require("mongoose");
const { createHmac, randomBytes } = require("node:crypto");

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
    },
    email : {
        type: String,
        required: true,
        max : 30,
        unique: true,
    },
    password : {
        type: String,
        required: true,
        min: 6,
    },
    profilePicture : {
        type: String,
        default: "",
    },
    coverPicture : {
        type: String,
        default: "",
    },
    followers : {
        type: Array,
        default: [],
    },
    followings : {
        type: Array,
        default: [],
    },
    isAdmin : {
        type: Boolean,
        default: false,
    },
    salt: {
        type : String,
    },
    desc : {
        type: String,
        max: 50,
    },
    city : {
        type: String,
        max: 50,
    },
}, { timestamps: true });

userSchema.pre('save', function (next) {
    const user = this;
    if(!user.isModified("password")) {
        return;
    }
    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256', salt).update(user.password).digest("hex");

    this.salt = salt;
    this.password = hashedPassword;

    next();
});

const User = mongoose.model("user",userSchema);

module.exports = User;