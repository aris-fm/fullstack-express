import { Router } from "jsr:@oak/oak/router";
import { authRouter } from "./auth.ts";
import { userRouter } from "./users.ts";

const router = new Router();

// Use the authRouter for /auth routes
router.use("/auth", authRouter.routes(), authRouter.allowedMethods());

// Use the userRouter for /users routes
router.use("/users", userRouter.routes(), userRouter.allowedMethods());

export default router;
