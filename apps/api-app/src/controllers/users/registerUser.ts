import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import type { Context } from "jsr:@oak/oak/context";
import { users } from "@/models/users.ts";

export const registerUser = async (ctx: Context) => {
  const { name, email, password, confPassword, username } = await ctx.request
    .body.json();

  // Check if password matches confirm password
  if (password !== confPassword) {
    ctx.response.status = 400;
    ctx.response.body = {
      msg: "Password & Confirm Password didn't match",
    };
    return;
  }

  // Generate salt and hash the password
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  try {
    // Create the user in the database
    await users.create({
      name,
      email,
      password: hash,
      username,
    });

    // Respond with success message
    ctx.response.status = 201;
    ctx.response.body = { msg: "Register success!" };
  } catch (error) {
    console.error(error);
    ctx.response.status = 500; // Handle error appropriately
    ctx.response.body = { msg: "Internal server error" };
  }
};
