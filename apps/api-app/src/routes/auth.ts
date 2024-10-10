import express from "express"
import { refreshToken } from "@/controllers/users/refreshToken"
import { logout } from "@/controllers/users/logout"
import { login } from "@/controllers/users/login"

export const authRouter = express.Router()

authRouter.post("/login", login)
authRouter.get("/token", refreshToken)
authRouter.delete("/logout", logout)
