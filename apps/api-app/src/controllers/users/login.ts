import { verify } from "jsr:@ts-rex/bcrypt";
import { create, getNumericDate } from "jsr:@zaubrik/djwt";
import { User } from "@/models/Users.ts";
import { hourInMilis, monthInMilis } from "@/const/datetime.ts";
import { Op } from "sequelize";
import type { Context } from "jsr:@oak/oak/context";
import { createCryptoKey } from "@/utils/createCryptoKey.ts";
import {
  handle4xxError,
  handleServerError,
} from "@common/utils/errorHandler.ts";
import { handle2xxRequest } from "@common/utils/successHandler.ts";

// JWT Secret keys from environment variables
const accessTokenSecret = Deno.env.get("ACCESS_TOKEN_SECRET")!;
const refreshTokenSecret = Deno.env.get("REFRESH_TOKEN_SECRET")!;

export const login = async (ctx: Context) => {
  try {
    const { email, username, password } = await ctx.request.body.json();
    const emailOrUsername = email || username;

    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: emailOrUsername }, { username: emailOrUsername }],
      },
    });

    if (!user) {
      handle4xxError({ ctx, status: 404, message: "User not found" });
      return;
    }

    const match = verify(password, user.password);
    if (!match) {
      handle4xxError({ ctx, status: 400, message: "Wrong Password" });
      return;
    }

    const { id, name, email: userEmail } = user;

    const accessKey = await createCryptoKey(accessTokenSecret);
    const refreshKey = await createCryptoKey(refreshTokenSecret);

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

    await User.update(
      { refresh_token: refreshToken },
      {
        where: {
          id,
        },
      },
    );

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

    handle2xxRequest({ ctx, status: 200, body: { accessToken } });
  } catch (error) {
    handleServerError(ctx, error);
  }
};
