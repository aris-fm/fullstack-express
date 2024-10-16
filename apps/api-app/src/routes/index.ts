import express from "express";
import { authRouter } from "./auth.ts";
import { userRouter } from "./users.ts";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);

export default router;
