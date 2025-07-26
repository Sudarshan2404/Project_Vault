import Projects from ".././models/projects.js";
import { z } from "zod";

const projectSchema = z.object({
  title: z.string({ message: "Title must be a string" }),
  description: z
    .string()
    .min(150, { message: "Description should contain at least 150 letters" }),
  techstack: z.array(z.string(), {
    message: "Techstack must be an array of strings",
  }),
  tags: z.array(z.string(), { message: "Tags must be an array of strings" }),
  githublink: z.string().url({ message: "Must be a valid GitHub URL" }),
  livelink: z.string().url({ message: "Must be a valid live project URL" }),
  screenshot: z.string({ message: "Screenshot URL must be a string" }),
});

export const addProject = async (req, res) => {
  try {
    const data = projectSchema.safeParse(req.body);
    if (!data.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: data.error.errors,
      });
    }
    const author = req.user.id;
    const newProject = await Projects.create({ ...data.data, author });
    res
      .status(201)
      .json({ success: true, message: "Project created successfully" });
  } catch (error) {
    console.error("Error in addProject controller", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const Allprojects = await Projects.find();
    if (Allprojects.length === 0) {
      return res
        .status(200)
        .json({ success: true, message: "No Projects found" });
    }
    res.status(200).json({
      success: true,
      message: "Found All Projects",
      Projects: Allprojects,
    });
  } catch (error) {
    console.error("Error in getAllProjects ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
