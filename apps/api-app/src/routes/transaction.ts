import { Router } from "jsr:@oak/oak/router";
import { getTransactions } from "@/controllers/transactions/getTransactions.ts";
import { getTransactionById } from "@/controllers/transactions/getTransactionById.ts";
import { createTransaction } from "@/controllers/transactions/createTransaction.ts";
import { updateTransaction } from "@/controllers/transactions/updateTransaction.ts";
import { deleteTransaction } from "@/controllers/transactions/deleteTransaction.ts";

export const transactionRouter = new Router();
transactionRouter.get("/", getTransactions);
transactionRouter.get("/:id", getTransactionById);
transactionRouter.post("/", createTransaction);
transactionRouter.put("/:id", updateTransaction);
transactionRouter.delete("/:id", deleteTransaction);
