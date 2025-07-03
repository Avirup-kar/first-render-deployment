import mongoose from "mongoose";
import {createHmac, randomBytes} from "crypto";
import { generateToken } from "../services/authentication.js";

const { Schema, model } = mongoose;
const userSchema = new Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  salt: { type: String },
  password: { type: String, required: true },
  profileImageUrl: { type: String, default: "/image/avtar.png" },
  role: { type: String, enum: ["user", "admin"], default: "user" },
},{ timestamps: true});

userSchema.pre('save', function(next) {
  const user = this;
    if (!user.isModified('password')) return

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256', salt)
        .update(user.password)
        .digest('hex');

        this.salt = salt;
        this.password = hashedPassword;

    next();
});

userSchema.static('matchPasswordAndGenerateToken', async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error("User not found");

    const salt = user.salt;
    const hashedPassword = user.password;

    const userprovidedPassword = createHmac('sha256', salt)
        .update(password)
        .digest('hex');

    if (userprovidedPassword !== hashedPassword) throw new Error("Invalid password");

    const token = generateToken(user);
    return token;
})

const User = mongoose.models.User || model("user", userSchema);
export default User;