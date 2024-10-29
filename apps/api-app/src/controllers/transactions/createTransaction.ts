import type { Context } from "jsr:@oak/oak/context";
import { Transaction } from "@/models/Transaction.ts";
import { Category } from "@/models/Category.ts";
import {
  handle4xxError,
  handleServerError,
} from "@common/utils/errorHandler.ts";
import { handle2xxRequest } from "@common/utils/successHandler.ts";

export const createTransaction = async (ctx: Context) => {
  try {
    const { amount, description, category_name } = await ctx
      .request.body
      .json();

    if (!amount || !description || !category_name) {
      handle4xxError({
        ctx,
        status: 400,
        message:
          "Amount, description, and category ID or category name are required",
      });
      return;
    }

    const category_type = amount > 0 ? "income" : "expense";
    let category = await Category.findOne({ where: { name: category_name } });

    if (!category) {
      category = await Category.create({
        name: category_name,
        type: category_type,
      });
    }

    const newTransaction = await Transaction.create({
      amount,
      description,
      category_id: category.id,
    });

    handle2xxRequest({ ctx, status: 201, body: newTransaction });
  } catch (error) {
    handleServerError(ctx, error);
  }
};
