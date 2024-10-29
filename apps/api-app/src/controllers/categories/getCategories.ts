import type { Context } from "jsr:@oak/oak/context";
import { Category } from "@/models/Category.ts";
import { handle2xxRequest } from "@common/utils/successHandler.ts";
import { handleServerError } from "@common/utils/errorHandler.ts";

export const getCategories = async (ctx: Context) => {
  try {
    const limit = ctx.request.url.searchParams.get("limit") || "10";
    const offset = ctx.request.url.searchParams.get("offset") || "0";

    const categories = await Category.findAndCountAll({
      offset: +offset,
      limit: +limit,
      attributes: ["id", "name", "type", "description"],
    });

    handle2xxRequest({ ctx, status: 200, body: categories });
  } catch (error) {
    handleServerError(ctx, error);
  }
};
