import koa from "koa";
import { decodeToken } from "../lib/token";

export default async function jwtMiddleware(
  ctx: koa.Context,
  next: () => Promise<any>
) {
  let accessToken = ctx.cookies.get("access_token");
  const { authorization } = ctx.request.header;
  if (!accessToken && authorization) accessToken = authorization.split(" ")[1];

  if (accessToken) {
    try {
      const accessTokenData = await decodeToken<{ id: number; sub: string }>(
        accessToken
      );
      if (accessTokenData.sub !== "access_token") {
        ctx.status = 401;
        ctx.body = { error: "Invalid access token" };
        return;
      }
      ctx.state.user = { id: accessTokenData.id };
    } catch (e) {
      if (e.name === "TokenExpiredError") {
        ctx.status = 401;
        ctx.body = { code: "EXPIRED_ACCESS_TOKEN" };
        return;
      } else if (e.name === "JsonWebTokenError") {
        // when jwt malformed, invalid signature/audience/issuer,...
        // see https://github.com/auth0/node-jsonwebtoken#readme
        ctx.status = 401;
        ctx.body = { code: "INVALID_TOKEN" };
        return;
      } else next();
    }
  }

  return next();
}
