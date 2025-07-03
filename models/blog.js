import mongoose from "mongoose";

const { Schema, model } = mongoose;
const userSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    coverpic: { type: String, required: false },
    createdtBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
},{ timestamps: true});

const Blog = mongoose.models.Blog || model("blog", userSchema);
export default Blog;