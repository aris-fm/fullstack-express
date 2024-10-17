import { verifyToken } from "@/middleware/verifyToken.ts";
import { registerUser } from "@/controllers/users/registerUser.ts";
import { getUsers } from "@/controllers/users/getUsers.ts";
import { Router } from "jsr:@oak/oak/router";

export const userRouter = new Router();

userRouter.get("/", verifyToken, getUsers);
userRouter.post("/", registerUser);
