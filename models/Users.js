import mongoose from "mongoose";

export const Users = new mongoose.Schema({
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
  bio: string,
  createdat: {
    type: Date,
    default: Date.now(),
  },
});
