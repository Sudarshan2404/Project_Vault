import mongoose from "mongoose";
import { object, string } from "zod";
import { User } from "./Users";

const projectschema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    techstack: {
      type: [String],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    githublink: {
      type: String,
    },
    livelink: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    Screenshot: {
      type: String,
      required: true,
    },
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("projects", projectschema);
export default Project;
