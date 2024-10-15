import type { Request, Response } from "express";
import { users as usersModel } from "@/models/users";

interface GetUsersParams extends Request {
  query: {
    offset?: string;
    limit?: string;
  };
}

export const getUsers = async (req: GetUsersParams, res: Response) => {
  const { limit = "3", offset = "0" } = req.query;
  try {
    const users = await usersModel.findAndCountAll({
      offset: +offset,
      limit: +limit,
      attributes: ["id", "username", "name", "email"],
    });
    res.json(users);
  } catch (error) {
    console.error(error);
  }
};
