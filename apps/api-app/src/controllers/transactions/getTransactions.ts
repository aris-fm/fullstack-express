import type { Context } from "jsr:@oak/oak/context";
import { Transaction } from "@/models/Transaction.ts";
import { Category } from "@/models/Category.ts";
import {
  handle4xxError,
  handleServerError,
} from "@common/utils/errorHandler.ts";
import { type FindAndCountOptions, Op } from "sequelize";
import { handle2xxRequest } from "@common/utils/successHandler.ts";

export const getTransactions = async (ctx: Context) => {
  try {
    const limit = ctx.request.url.searchParams.get("limit") || "10";
    const offset = ctx.request.url.searchParams.get("offset") || "0";
    const categoryName = ctx.request.url.searchParams.get("category");
    const transactionType = ctx.request.url.searchParams.get("type");

    const queryOptions: FindAndCountOptions = {
      offset: +offset,
      limit: +limit,
      attributes: ["id", "amount", "createdAt", "description", "category_id"],
      include: [
        {
          model: Category,
          attributes: ["id", "name", "type"],
        },
      ],
    };

    if (categoryName) {
      const category = await Category.findOne({
        where: { name: categoryName },
      });
      if (!category) {
        handle4xxError({ ctx, status: 404, message: "Category not found" });
        return;
      }
      queryOptions.where = { category_id: category.id };
    }

    if (transactionType === "income") {
      queryOptions.where = { amount: { [Op.gt]: 0 } };
    }

    if (transactionType === "expense") {
      queryOptions.where = { amount: { [Op.lt]: 0 } };
    }

    const transactions = await Transaction.findAndCountAll(queryOptions);

    handle2xxRequest({ ctx, status: 200, body: transactions });
  } catch (error) {
    handleServerError(ctx, error);
  }
};
