import Express from "express";
import { connectDB } from "./config/db.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoute from "./routes/Userroute.js";
import authRoute from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import mediaRoute from "./routes/mediaRoute.js";
import authMiddleware from "./middlewares/authMiddleware.js";
import fs from "fs";
import fileUpload from "express-fileupload";
import Projectroute from "./routes/Projectroutes.js";
import cors from "cors";
import https from "https";
import updateProfileRoutes from "./routes/updateProfileRoutes.js";

dotenv.config();
const app = Express();
const port = 3000;
connectDB();

app.use(Express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://192.168.0.100:5173"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./tmp/",
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to backend");
});

app.get("/api/ping", (req, res) => {
  res.status(200).json({ success: true, message: "Connected to backend" });
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/media", mediaRoute);
app.use("/api/projects", Projectroute);
app.use("/api/updateprofile", updateProfileRoutes);

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

const options = {
  key: fs.readFileSync("./certs/server.key"),
  cert: fs.readFileSync("./certs/server.cert"),
};

https.createServer(options, app).listen(port, () => {
  console.log(`Server running on https://192.168.0.100:${port}`);
});
