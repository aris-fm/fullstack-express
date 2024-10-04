import express from "express";
import {
  getUsers,
  loginUser,
  logout,
  registerUser,
} from "../controllers/Users.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

router.get("/users", verifyToken, getUsers);
router.post("/users", registerUser);
router.post("/login", loginUser);
router.get("/token", refreshToken);
router.delete("/logout", logout);

export default router;
