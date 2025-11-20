import { updateBio } from "../controllers/updateProfile.js";
import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/updatebio", authMiddleware, updateBio);

export default router;
