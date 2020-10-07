import { Context } from "koa";
import { decodeToken } from "../lib/token";

function setResponse(ctx: Context, status: number, errorCode: string): void {
  ctx.status = status;
  ctx.body = { code: errorCode };
}

function getAccessToken(ctx: Context): string | undefined {
  const { authorization } = ctx.request.header;
  if (authorization) return authorization.split(" ")[1];

  return ctx.cookies.get("access_token");
}

export default function jwtMiddleware(ctx: Context, next: any) {
  const accessToken = getAccessToken(ctx);
  if (!accessToken) return next();

  return decodeToken<{ id: number; sub: string }>(accessToken, {
    subject: "access_token",
  })
    .then((data) => {
      ctx.state.user = { id: data.id };
      return next();
    })
    .catch((e) => {
      switch (e.name) {
        case "TokenExpiredError":
          setResponse(ctx, 401, "EXPIRED_ACCESS_TOKEN");
          break;
        case "JsonWebTokenError":
          setResponse(ctx, 401, "INVALID_TOKEN");
          break;
        case "JsonWebTokenError":
          // NotBeforeError is not handled
          break;
        default:
          throw e;
      }
    });
}
