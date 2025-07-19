import mongoose from "mongoose";
import User from ".././models/Users.js";
import bcrypt from "bcrypt";
import genreateToken from ".././utils/genreateToken.js";

const { models } = mongoose;

export const register = async (req, res) => {
  try {
    const { name, username, email, password, avtar, bio } = req.body;

    const userfound = await User.findOne({ email });

    if (userfound) {
      return res.status(400).json({ message: "User already exist" });
    }

    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      username,
      email,
      password: hashedPass,
      avtar,
      bio,
    });

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      token: genreateToken(newUser._id),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An internal server error occured" });
  }
};
