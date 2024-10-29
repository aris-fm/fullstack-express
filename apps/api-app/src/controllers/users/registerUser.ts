import { genSalt, hash } from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import type { Context } from "jsr:@oak/oak/context";
import { User } from "@/models/Users.ts";
import {
  handle4xxError,
  handleServerError,
} from "@common/utils/errorHandler.ts";
import { handle2xxRequest } from "@common/utils/successHandler.ts";

export const registerUser = async (ctx: Context) => {
  const { name, email, password, confPassword, username } = await ctx.request
    .body.json();

  if (password !== confPassword) {
    handle4xxError({
      ctx,
      status: 400,
      message: "Password & Confirm Password didn't match",
    });
    return;
  }

  const salt = await genSalt();
  const hashedPassword = await hash(password, salt);
  try {
    await User.create({
      name,
      email,
      password: hashedPassword,
      username,
    });

    handle2xxRequest({ ctx, status: 201, body: { msg: "Register success!" } });
  } catch (error) {
    handleServerError(ctx, error);
  }
};
