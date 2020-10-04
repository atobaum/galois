import koa from "koa";
import { decodeToken } from "../lib/token";
export default async function jwtMiddleware(
  ctx: koa.Context,
  next: () => Promise<any>
) {
  let accessToken = ctx.cookies.get("access_token");
  const { authorization } = ctx.request.header;
  if (!accessToken && authorization) accessToken = authorization.split(" ")[1];

  // const refreshToken = ctx.cookies.get("refresh_token");

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
        accessToken = undefined;
      } else {
        throw e;
      }
    }
  }

  // if (!accessToken && refreshToken) {
  //   try {
  //     const refreshTokenData = await decodeToken<RefreshTokenData>(
  //       refreshToken
  //     );
  //     if (refreshTokenData.sub !== "refresh_token") {
  //       ctx.status = 401;
  //       ctx.body = { error: "Invalid refresh token" };
  //       return;
  //     }

  //     //validity check in db
  //     const refreshTokenDb = await getRepository(RefreshToken).findOne({
  //       where: { id: refreshTokenData.token_id },
  //       relations: ["user"],
  //     });

  //     if (refreshTokenDb === undefined) {
  //       ctx.status = 500;
  //       ctx.body = { error: "Inconsistand DB: refresh token" };
  //       return;
  //     }

  //     if (refreshTokenDb.disabled) {
  //       ctx.status = 401;
  //       ctx.body = { error: "Disabled refresh token" };
  //       return;
  //     }

  //     const diff = refreshTokenData.exp * 1000 - new Date().getTime();
  //     let tokens = null;
  //     if (diff < 2 * 24 * 60 * 60 * 1000) {
  //       tokens = await refreshTokenDb.user.generateAuthTokens();
  //     } else {
  //       tokens = {
  //         accessToken: await refreshTokenDb.user.generateAccessToken(),
  //       };
  //     }
  //     setTokens(ctx, tokens);
  //   } catch (e) {
  //     // if (e.name !== "TokenExpiredError") // Logging
  //     clearTokens(ctx);
  //   }
  // }
  return next();
}
