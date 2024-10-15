import jwt, { type VerifyErrors } from "jsonwebtoken";
import type { Request, Response } from "express";
import { users } from "@/models/users";
import { hourInMilis, oneHour } from "@/const/datetime";

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) return res.sendStatus(401);
    const user = await users.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });
    if (!user) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err: VerifyErrors | null) => {
      if (err) return res.sendStatus(403);
      const { id, name, email } = user;
      const accessToken = jwt.sign({ id, name, email }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: oneHour,
      });
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: hourInMilis,
        secure: process.env.ENV !== "development",
      });
      res.json({ accessToken });
    });
  } catch (error) {
    console.error(error);
  }
};
