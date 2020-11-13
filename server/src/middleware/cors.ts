import { Middleware } from "koa";
export default function cors(...allowedOrigins: string[]): Middleware {
  return (ctx, next) => {
    const origin = ctx.header.origin;
    if (allowedOrigins.includes(origin))
      ctx.set("Access-Control-Allow-Origin", origin);

    return next();
  };
}
