import Koa from "koa";
export default async function checkLoggedIn(ctx: Koa.Context, next: Koa.Next) {
  if (!ctx.state.user) {
    ctx.status = 401;
    ctx.body = {
      error: "NOT_AUTHENTICATED",
      message: "Login first.",
    };
  } else await next();
}
