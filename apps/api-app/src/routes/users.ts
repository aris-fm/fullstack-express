import express from "express"
import { verifyToken } from "@/middleware/verifyToken"
import { registerUser } from "@/controllers/users/registerUser"
import { getUsers } from "@/controllers/users/getUsers"

export const userRouter = express.Router()

userRouter.get("/", verifyToken, getUsers)
userRouter.post("/", registerUser)
