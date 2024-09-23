import { Users } from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await Users.findAll({
      attributes: ["id", "name", "email"],
    });
    res.json(users);
  } catch (error) {
    console.error(error);
  }
};

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, confPassword } = req.body;
  if (password !== confPassword) {
    return res
      .status(400)
      .json({ msg: "Password & Confirm Password didn't match" });
  }
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  try {
    await Users.create({
      name,
      email,
      password: hash,
    });
    res.status(201).json({ msg: "Register success!" });
  } catch (error) {
    console.error(error);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const user = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) res.status(400).json({ msg: "Wrong Password" });
    const { id, name, email } = user;
    const accessToken = jwt.sign(
      { id, name, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1m",
      }
    );
    const refreshToken = jwt.sign(
      { id, name, email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    await Users.update(
      { refresh_token: refreshToken },
      {
        where: {
          id,
        },
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: process.env.ENV !== "development",
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 60 * 1000,
      secure: process.env.ENV !== "development",
    });
    res.json({ accessToken });
  } catch (error) {
    res.status(404).json({ msg: "User not found" });
    console.error(error);
  }
};

export const logout = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) return res.sendStatus(204);
  const user = await Users.findOne({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user) return res.sendStatus(204);
  await Users.update(
    { refresh_token: null },
    {
      where: {
        id: user.id,
      },
    }
  );
  res.clearCookie("refreshToken");
  res.clearCookie("accessToken");
  return res.sendStatus(200);
};
