import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { Users } from "../models/UserModel.js";

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) return res.sendStatus(401);
    const user = await Users.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });
    if (!user) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err: Error) => {
      if (err) return res.sendStatus(403);
      const { id, name, email } = user;
      const accessToken = jwt.sign(
        { id, name, email },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1m",
        }
      );
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 60 * 1000,
        secure: process.env.ENV !== "development",
      });
      res.json({ accessToken });
    });
  } catch (error) {}
};
