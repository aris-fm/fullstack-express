import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import { users } from "../../models/users.ts";
import type { User } from "../../types.ts";

interface UserRegister extends Request {
  body: Omit<User, "refreshToken"> & { confPassword: string };
}

export const registerUser = async (req: UserRegister, res: Response) => {
  const { name, email, password, confPassword, username } = req.body;
  if (password !== confPassword) {
    return res.status(400).json({
      msg: "Password & Confirm Password didn't match",
    });
  }
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  try {
    await users.create({
      name,
      email,
      password: hash,
      username,
    });
    res.status(201).json({ msg: "Register success!" });
  } catch (error) {
    console.error(error);
  }
};
