import type { Context } from "jsr:@oak/oak/context";
import {
  handle4xxError,
  handleServerError,
} from "@common/utils/errorHandler.ts";
import { Category } from "@/models/Category.ts";
import { handle2xxRequest } from "@common/utils/successHandler.ts";

export const createCategory = async (ctx: Context) => {
  try {
    const { name, type, description } = await ctx.request.body.json();

    if (!name || !type) {
      handle4xxError({
        ctx,
        status: 400,
        message: "Name and type are required",
      });
      return;
    }

    const newCategory = await Category.create({
      name,
      type,
      description,
    });

    handle2xxRequest({ ctx, status: 201, body: newCategory });
  } catch (error) {
    handleServerError(ctx, error);
  }
};
