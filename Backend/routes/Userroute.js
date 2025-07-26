import { getme } from ".././controllers/usercontroller.js";
import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/getme", authMiddleware, getme);

export default router;
