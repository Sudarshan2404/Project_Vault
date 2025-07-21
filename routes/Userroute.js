import { register, login, getme } from ".././controllers/usercontroller.js";
import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getme", authMiddleware, getme);

export default router;
