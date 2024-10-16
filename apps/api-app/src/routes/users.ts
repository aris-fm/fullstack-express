import express from "express";
import { verifyToken } from "../middleware/verifyToken.ts";
import { registerUser } from "../controllers/users/registerUser.ts";
import { getUsers } from "../controllers/users/getUsers.ts";

export const userRouter = express.Router();

userRouter.get("/", verifyToken, getUsers);
userRouter.post("/", registerUser);
