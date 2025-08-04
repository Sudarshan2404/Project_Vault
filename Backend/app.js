import Express from "express";
import { connectDB } from "./config/db.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoute from "./routes/Userroute.js";
import authRoute from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import mediaRoute from "./routes/mediaRoute.js";
import authMiddleware from "./middlewares/authMiddleware.js";
import fileUpload from "express-fileupload";
import Projectroute from "./routes/Projectroutes.js";
import cors from "cors";

dotenv.config();
const app = Express();
const port = 3000;
connectDB();

app.use(Express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
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

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/media", mediaRoute);
app.use("/api/projects", Projectroute);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
