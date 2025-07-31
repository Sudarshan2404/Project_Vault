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
      userfollowing: isFollowing,
      userfollower: isTargetfollowing,
    });
  } catch (error) {
    console.error("Error while get public user info", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const toggleFollow = async (req, res) => {
  try {
    const userId = req.user.id;
    const targetuserId = req.params.targetuserId;

    if (userId === targetuserId) {
      return res
        .status(405)
        .json({ success: false, message: "Cannot follow yourself" });
    }

    const userfollowing = await User.findById(userId).select("following");
    const targetfollowers = await User.findById(targetuserId).select(
      "followers"
    );

    console.log(userfollowing);
    const isfollowing = userfollowing.following.includes(targetuserId);

    if (isfollowing) {
      userfollowing = userfollowing.following.filter(
        (id) => id.toString() !== targetuserId
      );
      targetfollowers = targetfollowers.followers.filter(
        (id) => id.toString() !== userId
      );
      userfollowing.save();
      targetfollowers.save();

      return res
        .status(200)
        .json({ success: true, message: "unfollowed user successfully" });
    }

    userfollowing.following.push(targetuserId);
    targetfollowers.followers.push(userId);
    userfollowing.save();
    targetfollowers.save();

    res
      .status(200)
      .json({ success: true, message: "Followed the user successfully" });
  } catch (error) {
    console.error("Error while following or unfollowing user", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
