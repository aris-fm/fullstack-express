import type { RouterContext } from "jsr:@oak/oak/router";
import { Category } from "@/models/Category.ts";
import {
  handle4xxError,
  handleServerError,
} from "@common/utils/errorHandler.ts";
import { handle2xxRequest } from "@common/utils/successHandler.ts";

export const getCategoryByName = async (ctx: RouterContext<string>) => {
  try {
    const { name } = ctx.params;
    const category = await Category.findOne({ where: { name } });

    if (!category) {
      handle4xxError({ ctx, status: 404, message: "Category not found" });
      return;
    }

    handle2xxRequest({ ctx, status: 200, body: category });
  } catch (error) {
    handleServerError(ctx, error);
  }
};
