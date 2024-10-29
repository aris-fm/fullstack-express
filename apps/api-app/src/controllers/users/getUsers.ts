import type { Context } from "jsr:@oak/oak/context";
import { User as usersModel } from "@/models/Users.ts";
import { handleServerError } from "@common/utils/errorHandler.ts";
import { handle2xxRequest } from "@common/utils/successHandler.ts";

export const getUsers = async (ctx: Context) => {
  try {
    const limit = ctx.request.url.searchParams.get("limit") || "3";
    const offset = ctx.request.url.searchParams.get("offset") || "0";
    const sort = ctx.request.url.searchParams.get("sort") || "DESC";

    const users = await usersModel.findAndCountAll({
      order: [["createdAt", sort]],
      offset: +offset,
      limit: +limit,
      attributes: ["id", "username", "name", "email"],
    });

    handle2xxRequest({ ctx, status: 200, body: users });
  } catch (error) {
    handleServerError(ctx, error);
  }
};
