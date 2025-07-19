import { register } from ".././controllers/usercontroller.js";
import express from "express";

const router = express.Router();

router.get("/register", register);

export default router;
