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

  const dataOrFail = decodeToken<{ id: number; sub: string }>(accessToken, {
    subject: "access_token",
  });
  if (dataOrFail.isRight) {
    ctx.state.user = { id: dataOrFail.getRight().id };
    return next();
  } else {
    switch (dataOrFail.getLeft().name) {
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
        throw dataOrFail.getLeft();
    }
  }
}
