import type { Context } from "jsr:@oak/oak/context";
import { users } from "@/models/users.ts";

export const logout = async (ctx: Context) => {
  const { cookies, response } = ctx;
  const refreshToken = await cookies.get("refreshToken");

  if (!refreshToken) {
    response.status = 204;
    return;
  }

  const user = await users.findOne({
    where: {
      refresh_token: refreshToken,
    },
  });

  if (!user) {
    response.status = 204;
    return;
  }

  await users.update(
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
