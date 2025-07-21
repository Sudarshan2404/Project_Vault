import Express from "express";
import { connectDB } from "./config/db.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoute from "./routes/Userroute.js";
import cookieParser from "cookie-parser";
import authMiddleware from "./middlewares/authMiddleware.js";

dotenv.config();
const app = Express();
const port = 3000;

app.use(Express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

connectDB();

app.use("/api/auth", userRoute);

app.get("/protected", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "yoho token came",
    user: req.user,
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
