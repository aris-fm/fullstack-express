import express from "express";
import { db } from "./config/db.ts";
import router from "./routes/index.ts";
import cookieParser from "cookie-parser";
import cors from "cors";
import "jsr:@std/dotenv/load";

const app = express();

try {
  await db.authenticate();
} catch (error) {
  console.error(error);
}

const port = +Deno.env.get("API_PORT")!;

app.use(
  cors({
    credentials: true,
    origin: `${Deno.env.get("APP_HOST")!}:${Deno.env.get("APP_PORT")!}`,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(port, () => console.log(`Server running at port ${port}`));
