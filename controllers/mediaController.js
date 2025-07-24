import cloudinary from ".././config/cloudinaryConfig.js";
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
