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
  },
  avtar: String,
  bio: String,
  createdate: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", userSchema);
export default User;
