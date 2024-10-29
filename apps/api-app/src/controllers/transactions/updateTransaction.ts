import type { RouterContext } from "jsr:@oak/oak/router";
import { Transaction } from "@/models/Transaction.ts";
import { Category } from "@/models/Category.ts";
import {
  handle4xxError,
  handleServerError,
} from "@common/utils/errorHandler.ts";
import { handle2xxRequest } from "@common/utils/successHandler.ts";

export const updateTransaction = async (ctx: RouterContext<string>) => {
  try {
    const { id } = ctx.params;
    const { amount, date, description, category_id } = await ctx.request.body
      .json();
    const transaction = await Transaction.findByPk(id);

    if (!transaction) {
      handle4xxError({ ctx, status: 404, message: "Transaction not found" });
      return;
    }

    if (category_id) {
      const category = await Category.findByPk(category_id);
      if (!category) {
        handle4xxError({ ctx, status: 404, message: "Category not found" });
        return;
      }
    }

    await transaction.update({
      amount: amount !== undefined ? amount : transaction.amount,
      date: date || transaction.date,
      description: description || transaction.description,
      category_id: category_id || transaction.category_id,
    });

    handle2xxRequest({ ctx, status: 200, body: transaction });
  } catch (error) {
    handleServerError(ctx, error);
  }
};
