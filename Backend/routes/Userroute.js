import {
  getme,
  gettargetUser,
  toggleFollow,
} from ".././controllers/usercontroller.js";
import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/profile", authMiddleware, getme);
router.get("/getpublicuser/:targetuserId", authMiddleware, gettargetUser);
router.post("/follow/:targetuserId", authMiddleware, toggleFollow);

export default router;
