import { create, getNumericDate, verify } from "jsr:@zaubrik/djwt";
import type { Context } from "jsr:@oak/oak/context";
import { users } from "@/models/users.ts";
import { hourInMilis } from "@/const/datetime.ts";
import { createCryptoKey } from "@/utils/createCryptoKey.ts";

export const refreshToken = async (ctx: Context) => {
  try {
    // Get the refresh token from cookies
    const refreshToken = await ctx.cookies.get("refreshToken");
    if (!refreshToken) {
      ctx.response.status = 401;
      return;
    }

    // Find the user with the refresh token in the database
    const user = await users.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });
    if (!user) {
      ctx.response.status = 403;
      return;
    }

    // Convert the refresh token secret to a CryptoKey
    const refreshKey = await createCryptoKey(
      Deno.env.get("REFRESH_TOKEN_SECRET")!,
    );

    // Verify the refresh token
    try {
      await verify(refreshToken, refreshKey);

      // Generate a new access token
      const { id, name, email } = user;
      const accessKey = await createCryptoKey(
        Deno.env.get("ACCESS_TOKEN_SECRET")!,
      );
      const accessToken = await create(
        { alg: "HS512", typ: "JWT" },
        { id, name, email, exp: getNumericDate(hourInMilis) },
        accessKey,
      );

      // Set the new access token in cookies
      ctx.cookies.set("accessToken", accessToken, {
        httpOnly: true,
        maxAge: hourInMilis / 1000,
        secure: Deno.env.get("ENV") !== "development",
      });

      // Respond with the new access token
      ctx.response.status = 200;
      ctx.response.body = { accessToken };
    } catch (err) {
      console.error(err);
      ctx.response.status = 403; // Invalid or expired refresh token
    }
  } catch (error) {
    console.error(error);
    ctx.response.status = 500;
    ctx.response.body = { msg: "Internal server error" };
  }
};
