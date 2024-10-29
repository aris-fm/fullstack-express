import { Router } from "jsr:@oak/oak/router";
import { authRouter } from "@/routes/auth.ts";
import { userRouter } from "@/routes/users.ts";
import { verifyToken } from "@/middleware/verifyToken.ts";
import { transactionRouter } from "@/routes/transaction.ts";
import { categoryRouter } from "@/routes/categories.ts";

const router = new Router();

router.use("/auth", authRouter.routes(), authRouter.allowedMethods());
router.use("/users", userRouter.routes(), userRouter.allowedMethods());
router.use(
  "/transaction",
  verifyToken,
  transactionRouter.routes(),
  transactionRouter.allowedMethods(),
);
router.use(
  "/category",
  verifyToken,
  categoryRouter.routes(),
  categoryRouter.allowedMethods(),
);

export default router;
