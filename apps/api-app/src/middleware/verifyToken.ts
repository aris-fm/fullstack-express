import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User } from "../types";

export const verifyToken = (
  req: Request & User,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const authCookie = req.cookies["accessToken"];
  let token = authHeader && authHeader.split(" ")[1];
  if (authCookie) token = authCookie;
  if (!token) return res.sendStatus(401);
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded: JwtPayload) => {
      if (err) return res.sendStatus(403);
      req.email = decoded.email;
      next();
    }
  );
};
