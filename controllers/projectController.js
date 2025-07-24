import Projectschema from ".././models/projects.js";
import { z } from "zod";

const projectSchema = z.object({});

export const addProject = async (req, res) => {
  try {
    const {
      title,
      description,
      techstack,
      tags,
      githublink,
      livelink,
      author,
      screesnshot,
    } = req.body;
  } catch (error) {}
};
