import cloudinary from ".././config/cloudinaryConfig.js";
import User from "../models/Users.js";
import fs from "fs";

export const uploadSs = async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res
        .status(400)
        .json({ success: false, message: "NO file uploaded" });
    }

    const file = req.files?.image;

    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "ProjectVault",
    });

    fs.unlinkSync(file.tempFilePath);

    res.status(200).json({
      success: true,
      message: "File uploaded sucessfully",
      url: result.secure_url,
    });
  } catch (error) {
    console.error("Error in Uploadss Controller ", error.message);
    res.status(500).json({
      message: "Internal server Error",
      success: false,
    });
  }
};

export const uploadAvtar = async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res
        .status(400)
        .json({ success: false, message: "NO file uploaded" });
    }

    const file = req.files?.image;

    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "Projectvault_Avtar",
    });

    fs.unlinkSync(file.tempFilePath);
    const avtar = result.secure_url;

    const updateAvtar = await User.findByIdAndUpdate(
      req.user.id,
      { avtar: avtar },
      {
        new: true,
      }
    );

    res
      .status(203)
      .json({ success: true, message: "Avtar Added successfully" });
  } catch (error) {
    console.error("Error while uploading avtar", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
