import { Application } from "jsr:@oak/oak/application";
import "jsr:@std/dotenv/load";
import { oakCors } from "jsr:@tajpouria/cors";
import { db } from "@/config/db.ts";
import router from "@/routes/index.ts";

const app = new Application();
const port = +Deno.env.get("API_PORT")!;
try {
  await db.authenticate();
  await db.sync();
} catch (error) {
  console.error(error);
}

app.use(oakCors({
  credentials: true,
  origin: `${Deno.env.get("APP_HOST")!}:${Deno.env.get("APP_PORT")!}`,
}));

app.use(router.routes());

console.info(`Server running at port ${port}`);
await app.listen({ port });
