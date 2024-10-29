import type { RouterContext } from "jsr:@oak/oak/router";
import { Transaction } from "@/models/Transaction.ts";
import {
  handle4xxError,
  handleServerError,
} from "@common/utils/errorHandler.ts";
import { handle2xxRequest } from "@common/utils/successHandler.ts";

export const getTransactionById = async (ctx: RouterContext<string>) => {
  try {
    const { id } = ctx.params;
    const transaction = await Transaction.findByPk(id);

    if (!transaction) {
      handle4xxError({ ctx, status: 404, message: "Transaction not found" });
      return;
    }

    handle2xxRequest({ ctx, status: 200, body: transaction });
  } catch (error) {
    handleServerError(ctx, error);
  }
};
