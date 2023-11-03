const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            lowercase: true,
        },
        desc: {
            type: String,
            max: 500
        },
        img: {
            type: String
        },
        likes: {
            type: Array,
            default: []
        },
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;