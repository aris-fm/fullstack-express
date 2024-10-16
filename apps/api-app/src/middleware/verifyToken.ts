import type { Next } from "jsr:@oak/oak/middleware";
import type { Context } from "jsr:@oak/oak/context";
import { verify } from "jsr:@zaubrik/djwt";

// Utility function to convert a secret string to a CryptoKey
function createKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-512" },
    false,
    ["sign", "verify"],
  );
}

// Middleware to verify the JWT token
export const verifyToken = async (ctx: Context, next: Next) => {
  try {
    // Get the token from the Authorization header or cookies
    const authHeader = ctx.request.headers.get("Authorization");
    const authCookie = await ctx.cookies.get("accessToken");
    let token = authHeader?.split(" ")[1]; // Extract token from the header
    if (authCookie) token = authCookie; // Override with cookie token if available
    if (!token) {
      ctx.response.status = 401; // Unauthorized
      return;
    }

    // Convert the access token secret to a CryptoKey
    const accessKey = await createKey(Deno.env.get("ACCESS_TOKEN_SECRET")!);

    // Verify the token
    const decoded = await verify(token, accessKey);

    // If decoded, attach the email to the request context state
    if (decoded && typeof decoded === "object") {
      ctx.state.email = decoded.email; // Attach the email to the state
    }

    // Proceed to the next middleware
    await next();
  } catch (err) {
    console.error(err);
    ctx.response.status = 403; // Forbidden
  }
};
