import type { ResponseBody } from "jsr:@oak/oak/response";
import type { Context } from "jsr:@oak/oak/context";

export const handle2xxRequest = (
  { ctx, status, body }: {
    ctx: Context;
    status: 200 | 201 | 204;
    body: ResponseBody;
  },
) => {
  ctx.response.status = status;
  ctx.response.body = body;
};
