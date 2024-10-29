import { create, getNumericDate, verify } from "jsr:@zaubrik/djwt";
import type { Context } from "jsr:@oak/oak/context";
import { User } from "@/models/Users.ts";
import { hourInMilis } from "@/const/datetime.ts";
import { createCryptoKey } from "@/utils/createCryptoKey.ts";
import { handleServerError } from "@common/utils/errorHandler.ts";

export const refreshToken = async (ctx: Context) => {
  try {
    const refreshToken = await ctx.cookies.get("refreshToken");
    if (!refreshToken) {
      ctx.response.status = 401;
      return;
    }

    const user = await User.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });
    if (!user) {
      ctx.response.status = 403;
      return;
    }

    const refreshKey = await createCryptoKey(
      Deno.env.get("REFRESH_TOKEN_SECRET")!,
    );

    try {
      await verify(refreshToken, refreshKey);

      const { id, name, email } = user;
      const accessKey = await createCryptoKey(
        Deno.env.get("ACCESS_TOKEN_SECRET")!,
      );
      const accessToken = await create(
        { alg: "HS512", typ: "JWT" },
        { id, name, email, exp: getNumericDate(hourInMilis) },
        accessKey,
      );

      ctx.cookies.set("accessToken", accessToken, {
        httpOnly: true,
        maxAge: hourInMilis / 1000,
        secure: Deno.env.get("ENV") !== "development",
      });

      ctx.response.status = 200;
      ctx.response.body = { accessToken };
    } catch (err) {
      console.error(err);
      ctx.response.status = 403;
    }
  } catch (error) {
    handleServerError(ctx, error);
  }
};
