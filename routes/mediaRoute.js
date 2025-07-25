import { uploadAvtar, uploadSs } from ".././controllers/mediaController.js";
import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/ss/upload", authMiddleware, uploadSs);
router.post("/avtar/upload", authMiddleware, uploadAvtar);

export default router;
