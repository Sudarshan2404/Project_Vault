import Express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

const app = Express();
const port = 3000;
dotenv.config();

connectDB();

app.get("/", (req, res) => {
  res.status(200).send("Everything is okay 🤘");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
