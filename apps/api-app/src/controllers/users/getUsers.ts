import type { Request, Response } from "express";
import { users as usersModel } from "@/models/users";

export const getUsers = async (_: Request, res: Response) => {
  try {
    const users = await usersModel.findAll({
      attributes: ["id", "name", "email"],
    });
    res.json(users);
  } catch (error) {
    console.error(error);
  }
};
