import { Router } from "jsr:@oak/oak/router";
import { authRouter } from "@/routes/auth.ts";
import { userRouter } from "@/routes/users.ts";

const router = new Router();

router.use("/auth", authRouter.routes(), authRouter.allowedMethods());
router.use("/users", userRouter.routes(), userRouter.allowedMethods());

export default router;
