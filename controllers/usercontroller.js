import mongoose from "mongoose";
import User from ".././models/Users.js";
import bcrypt from "bcrypt";
import genreateToken from ".././utils/genreateToken.js";
import { z } from "zod";

const { models } = mongoose;

export const getme = async (req, res) => {
  try {
    const user = req.user;
    res
      .status(200)
      .json({ status: true, message: "User fetched sucessfully", user: user });
  } catch (error) {
    console.error("Getme Error ", error.message);
    res
      .status(500)
      .json({ message: "Something went wrong while requesting the user info" });
  }
};
