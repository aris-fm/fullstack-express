import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import { users } from "@/models/users";
import type { User } from "@/types";
import { hourInMilis, monthInMilis, oneHour, oneMonth } from "@/const/datetime";
import { Op } from "sequelize";

interface UserLogin extends Request {
  body: Pick<User, "email" | "username" | "password">;
}

export const login = async (req: UserLogin, res: Response) => {
  try {
    const emailOrUsername = req.body.email || req.body.username;
    const user = await users.findOne({
      where: {
        [Op.or]: [{ email: emailOrUsername }, { username: emailOrUsername }],
      },
    });
    console.log("[log]", user);
    if (!user) return;
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) res.status(400).json({ msg: "Wrong Password" });
    const { id, name, email } = user;
    const accessToken = jwt.sign({ id, name, email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: oneHour,
    });
    const refreshToken = jwt.sign({ id, name, email }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: oneMonth,
    });
    await users.update(
      { refresh_token: refreshToken },
      {
        where: {
          id,
        },
      },
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: monthInMilis,
      secure: process.env.ENV !== "development",
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: hourInMilis,
      secure: process.env.ENV !== "development",
    });
    res.json({ accessToken });
  } catch (error) {
    res.status(404).json({ msg: "User not found" });
    console.error(error);
  }
};
