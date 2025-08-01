import {
  addProject,
  getAllProjects,
  getProject,
  likeProject,
} from "../controllers/projectController.js";
import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/addProject", authMiddleware, addProject);
router.get("/AllProjects", getAllProjects);
router.get("/getproject/:projectId", getProject);
router.post("/project/like/:projectId", authMiddleware, likeProject);

export default router;
