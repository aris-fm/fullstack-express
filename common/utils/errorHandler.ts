import type { Context } from "jsr:@oak/oak/context";

export const DEFAULT_ERROR_MESSAGES: Record<number, string> = {
  400: "Bad Request",
  401: "Unauthorized access",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
  500: "Internal Server Error",
  503: "Service Unavailable",
};

export const handleServerError = (
  ctx: Context,
  error: unknown,
  status = 500,
) => {
  console.error("Server error:", error);

  const message = DEFAULT_ERROR_MESSAGES[status] ||
    "An unexpected error occurred";
  ctx.response.status = status;
  ctx.response.body = { msg: `${message} error: ${error}` };
};

export const handle4xxError = (
  { ctx, status, message = "An error occured" }: {
    ctx: Context;
    status: 400 | 401 | 403 | 404 | 409;
    message?: string;
  },
) => {
  ctx.response.status = status;
  ctx.response.body = { msg: message };
};

// deno-lint-ignore no-explicit-any
export const handleClientError = (error: Error | any) => {
  if (error.response) {
    const status = error.response.status;
    const message = DEFAULT_ERROR_MESSAGES[status] ||
      error.response.data?.msg || "An unexpected error occurred";
    return { status, message };
  }

  return { status: 500, message: "An unexpected error occurred" };
};
