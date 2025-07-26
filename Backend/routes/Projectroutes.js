import {
  addProject,
  getAllProjects,
} from "../controllers/projectController.js";
import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/addProject", authMiddleware, addProject);
router.get("/AllProjects", getAllProjects);

export default router;
