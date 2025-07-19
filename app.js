import Express from "express";
import { connectDB } from "./config/db.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoute from "./routes/Userroute.js";

dotenv.config();
const app = Express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

connectDB();

app.use("/auth", userRoute);

app.get("/", (req, res) => {
  res.status(200).json("okay");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
