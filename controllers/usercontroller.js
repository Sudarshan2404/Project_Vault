import mongoose from "mongoose";
import User from ".././models/Users.js";
import bcrypt from "bcrypt";
import genreateToken from ".././utils/genreateToken.js";

const { models } = mongoose;

export const register = async (req, res) => {
  try {
    const { name, username, email, password, avtar, bio } = req.body;

    const userfound = await User.findOne({ email });
    const checkusername = await User.findOne({ username });

    if (userfound) {
      return res.status(400).json({ message: "User already exist" });
    }

    if (checkusername) {
      return res.status(400).json({
        message: "Username already exist choose a different username",
      });
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

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const findUser = await User.findOne({ username });
    const ismatch = bcrypt.compare(password, findUser.password);

    if (!findUser) {
      return res
        .status(403)
        .json({ message: "User not found please Register" });
    }

    if (!ismatch) {
      return res.status(403).json({
        message: "Invalid Password",
      });
    }

    res.status(200).json({
      _id: findUser._id,
      token: genreateToken(findUser._id),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
