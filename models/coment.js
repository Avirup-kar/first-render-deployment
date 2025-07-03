import mongoose from "mongoose";

const { Schema, model } = mongoose;
const userSchema = new Schema({
    content: { type: String, required: true },
    blogId: { type: mongoose.Schema.Types.ObjectId, ref: "blog" },
    createdtBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
},{ timestamps: true});

const Coments = mongoose.models.Coments || model("coment", userSchema);
export default Coments;