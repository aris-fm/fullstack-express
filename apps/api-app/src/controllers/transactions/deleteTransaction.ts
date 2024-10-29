import { Transaction } from "@/models/Transaction.ts";
import {
  handle4xxError,
  handleServerError,
} from "@common/utils/errorHandler.ts";
import type { RouterContext } from "jsr:@oak/oak/router";
import { handle2xxRequest } from "@common/utils/successHandler.ts";

export const deleteTransaction = async (ctx: RouterContext<string>) => {
  try {
    const { id } = ctx.params;
    const transaction = await Transaction.findByPk(id);

    if (!transaction) {
      handle4xxError({ ctx, status: 404, message: "Transaction not found" });
      return;
    }

    await transaction.destroy();
    handle2xxRequest({
      ctx,
      status: 200,
      body: { msg: "Transaction deleted successfully" },
    });
  } catch (error) {
    handleServerError(ctx, error);
  }
};
