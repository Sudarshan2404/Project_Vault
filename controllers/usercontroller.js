import mongoose from "mongoose";
import User from ".././models/Users.js";
import bcrypt from "bcrypt";
import genreateToken from ".././utils/genreateToken.js";
import { z } from "zod";

const { models } = mongoose;

const registerSchema = z.object({
  name: z.string().min(2),
  username: z.string().min(4),
  email: z.string().email(),
  password: z.string().min(6),
  avtar: z.string().optional(),
  bio: z.string().max(300).optional(),
});

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const register = async (req, res) => {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.format() });
    }

    const { name, username, email, password, avtar, bio } = parsed.data;

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

    res
      .cookie("token", genreateToken(newUser._id), {
        httpOnly: true,
        secure: process.env.NODE_Env == "producion",
        samesite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({
        success: true,
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      });
  } catch (error) {
    console.error("Auth Register Error:", error);
    res
      .status(500)
      .json({ success: false, message: "An internal server error occured" });
  }
};

export const login = async (req, res) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.format() });
    }

    const { username, password } = req.body;

    const findUser = await User.findOne({ username });

    if (!findUser) {
      return res
        .status(403)
        .json({ message: "User not found please Register" });
    }

    const ismatch = await bcrypt.compare(password, findUser.password);

    if (!ismatch) {
      return res.status(403).json({
        message: "Invalid Password",
      });
    }

    res
      .cookie("token", genreateToken(findUser._id), {
        httpOnly: true,
        secure: process.env.NODE_Env == "producion",
        samesite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        success: true,
        _id: findUser._id,
        username: findUser.username,
        email: findUser.email,
      });
  } catch (error) {
    console.error("Auth Login Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getme = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ status: true, user: user });
  } catch (error) {
    console.error("Getme Error ", error.message);
    res
      .status(500)
      .json({ message: "Something went wrong while requesting the user info" });
  }
};
