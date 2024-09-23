import express from "express";
import { db } from "./config/Database.js";
import router from "./routes/index.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const app = express();

try {
  await db.authenticate();
} catch (error) {
  console.error(error);
}

app.use(
  cors({
    credentials: true,
    origin: `${process.env.APP_HOST}:${process.env.FRONTEND_PORT}`,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(process.env.BACKEND_PORT, () =>
  console.log(`Server running at port ${process.env.BACKEND_PORT}`)
);
