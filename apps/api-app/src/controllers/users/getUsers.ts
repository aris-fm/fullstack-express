import type { Context } from "jsr:@oak/oak/context";
import { users as usersModel } from "../../models/users.ts";

export const getUsers = async (ctx: Context) => {
  try {
    // Get query parameters from the URL
    const limit = ctx.request.url.searchParams.get("limit") || "3";
    const offset = ctx.request.url.searchParams.get("offset") || "0";

    // Fetch users from the database
    const users = await usersModel.findAndCountAll({
      offset: +offset,
      limit: +limit,
      attributes: ["id", "username", "name", "email"],
    });

    // Set response body to the fetched users
    ctx.response.status = 200;
    ctx.response.body = users;
  } catch (error) {
    console.error(error);
    ctx.response.status = 500;
    ctx.response.body = { msg: "Internal server error" };
  }
};
