import { getme } from ".././controllers/usercontroller.js";
import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/profile", authMiddleware, getme);

export default router;
