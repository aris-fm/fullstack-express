import express from "express";
import { db } from "./config/Database.js";
import router from "./routes/index.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

dotenv.config({
  path: path.resolve('../../.env')
});

const app = express();

try {
  await db.authenticate();
} catch (error) {
  console.error(error);
}

const port = +process.env.API_PORT

app.use(
  cors({
    credentials: true,
    origin: `${process.env.APP_HOST}:${process.env.APP_PORT}`,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(port, () =>
  console.log(`Server running at port ${port}`)
);
