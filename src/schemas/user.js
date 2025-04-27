import { avataaarsNeutral } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type: String, 
        required: [true, "Email is required."],
        unique: [true, "Email already exists."],
        // eslint-disable-next-line no-useless-escape
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email address."]
    },
    password:{
        type: String,
        required: [true, "Password is required."],
        match: [/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."]
    },
    username:{
        type: String,
        required: [true, "Username is required."],
        unique: [true, "Username already exists."],
        match: [/^[a-zA-Z0-9]+$/, "Username can only contain alphanumeric characters."]
    },
    avatar:{
        type: String
    }
},{timestamps: true});

userSchema.pre("save", function saveUser(next) {
    const user = this;

    const newAvatar = createAvatar(avataaarsNeutral, {
        seed: user.username,
        backgroundColor: ["b6e3f4","c0aede","d1d4f9"],
        backgroundType: ["gradientLinear","solid"],
    })

    user.avatar = newAvatar.toString();

    next();
});


const user = mongoose.model("User", userSchema);

export default user;