import mongoose from "mongoose";
import User from ".././models/Users.js";
import bcrypt from "bcrypt";
import genreateToken from ".././utils/genreateToken.js";

const { models } = mongoose;

export const register = async (req, res) => {
  try {
    const { name, username, email, password, avtar, bio } = req.body;

    const userfound = User.findOne({ email });

    if (userfound) {
      return res.status(400).json({ message: "User already exist" });
    }

    const newUser = User.create({
      name,
      username,
      email,
      password,
      avtar,
      bio,
    });
  } catch (error) {
    res.status(500).json({ message: "An internal server error occured" });
  }
};
