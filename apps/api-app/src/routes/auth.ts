import { Router } from "jsr:@oak/oak/router";
import { refreshToken } from "@/controllers/users/refreshToken.ts";
import { logout } from "@/controllers/users/logout.ts";
import { login } from "@/controllers/users/login.ts";

export const authRouter = new Router();
authRouter.post("/login", login);
authRouter.get("/token", refreshToken);
authRouter.delete("/logout", logout);
