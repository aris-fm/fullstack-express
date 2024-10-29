import type { Context } from "jsr:@oak/oak/context";
import { User } from "@/models/Users.ts";

export const logout = async (ctx: Context) => {
  const { cookies, response } = ctx;
  const refreshToken = await cookies.get("refreshToken");

  if (!refreshToken) {
    response.status = 204;
    return;
  }

  const user = await User.findOne({
    where: {
      refresh_token: refreshToken,
    },
  });

  if (!user) {
    response.status = 204;
    return;
  }

  await User.update(
    { refresh_token: null },
    {
      where: {
        id: user.id,
      },
    },
  );

  await cookies.delete("refreshToken");
  await cookies.delete("accessToken");

  response.status = 200;
};
