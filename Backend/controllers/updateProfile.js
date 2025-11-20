import User from "../models/Users.js";
import { z } from "zod";

export const updateBio = async (req, res) => {
  const bioSchema = z.object({
    bio: z.string().max(300).optional(),
  });
  try {
    const parsed = bioSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.format() });
    }

    const user = req.user;
    const { bio } = parsed.data;

    await User.findByIdAndUpdate(
      user.id,
      { bio: bio },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Bio Updated Successfully",
    });
  } catch (error) {
    console.error("An error occured while updating bio ", error.message);
    res.status(500).json({
      success: false,
      message: "AN internal Server Occured",
    });
  }
};
