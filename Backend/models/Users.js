import mongoose from "mongoose";
import { object, string } from "zod";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  avtar: {
    type: String,
    default:
      "https://res.cloudinary.com/dfzwrhyow/image/upload/v1763561327/Gemini_Generated_Image_bailcmbailcmbail_tajt06.png",
  },
  bio: String,
  createdate: {
    type: Date,
    default: Date.now(),
  },
  following: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
});

const User = mongoose.model("User", userSchema);
export default User;
