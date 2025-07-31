import mongoose from "mongoose";
import User from ".././models/Users.js";
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

export const gettargetUser = async (req, res) => {
  try {
    const currentUserid = req.user.id;
    const targetuserId = req.params.targetuserId;

    const currentUser = await User.findById(currentUserid).select("following");
    const targetUser = await User.findById(targetuserId).select("-password");

    if (!targetUser) {
      res.status(400).json({
        success: false,
        message: "The requested user dont exist",
      });
    }

    const isFollowing = currentUser.following.includes(targetuserId);
    const isTargetfollowing = targetUser.following.includes(currentUserid);

    res.status(200).json({
      success: true,
      message: "User found successfully",
      targetuser: targetUser,
    });
  } catch (error) {
    console.error("Error while get public user info", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
