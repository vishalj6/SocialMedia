const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: {
            unique: true,
            type: String,
            required: true,
            lowercase: true,
        },
        email: {
            type: String,
            lowercase: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        profilePic: {
            type: String,
            default: "https://images.pexels.com/lib/avatars/orange.png?w=50&h=50&fit=crop&dpr=1",
        },
        coverPic: {
            type: String,
            default: "https://flowbite.com/docs/images/examples/image-1@2x.jpg",
        },
        bio: {
            type: String,
            max: 200
        },
        posts: {
            type: Array,
            default: []
        },
        followers: {
            type: Array,
            default: []
        },
        following: {
            type: Array,
            default: []
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;