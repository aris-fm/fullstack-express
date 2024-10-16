import { verify } from "jsr:@ts-rex/bcrypt";
import { create, getNumericDate } from "jsr:@zaubrik/djwt";
import { users } from "../../models/users.ts";
import { hourInMilis, monthInMilis } from "../../const/datetime.ts";
import { Op } from "npm:sequelize";
import type { Context } from "jsr:@oak/oak/context";

function createKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-512" },
    false,
    ["sign", "verify"],
  );
}

// JWT Secret keys from environment variables
const accessTokenSecret = Deno.env.get("ACCESS_TOKEN_SECRET")!;
const refreshTokenSecret = Deno.env.get("REFRESH_TOKEN_SECRET")!;

export const login = async (ctx: Context) => {
  try {
    const { email, username, password } = await ctx.request.body.json();
    const emailOrUsername = email || username;

    const user = await users.findOne({
      where: {
        [Op.or]: [{ email: emailOrUsername }, { username: emailOrUsername }],
      },
    });

    if (!user) {
      ctx.response.status = 404;
      ctx.response.body = { msg: "User not found" };
      return;
    }

    const match = await verify(password, user.password);
    if (!match) {
      ctx.response.status = 400;
      ctx.response.body = { msg: "Wrong Password" };
      return;
    }

    const { id, name, email: userEmail } = user;

    const accessKey = await createKey(accessTokenSecret);
    const refreshKey = await createKey(refreshTokenSecret);

    // Create JWT tokens
    const accessToken = await create(
      { alg: "HS512", typ: "JWT" },
      { id, name, email: userEmail, exp: getNumericDate(hourInMilis) },
      accessKey,
    );
    const refreshToken = await create(
      { alg: "HS512", typ: "JWT" },
      { id, name, email: userEmail, exp: getNumericDate(monthInMilis) },
      refreshKey,
    );

    // Update user's refresh token in the database
    await users.update(
      { refresh_token: refreshToken },
      {
        where: {
          id,
        },
      },
    );

    // Set cookies for tokens
    ctx.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: monthInMilis / 1000,
      secure: Deno.env.get("ENV") !== "development",
    });

    ctx.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      maxAge: hourInMilis / 1000,
      secure: Deno.env.get("ENV") !== "development",
    });

    ctx.response.status = 200;
    ctx.response.body = { accessToken };
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { msg: "Internal server error" };
    console.error(error);
  }
};
