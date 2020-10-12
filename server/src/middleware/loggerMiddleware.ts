import { Context, Next } from "koa";
export default function koaLogger(logger: any) {
  return async (ctx: Context, next: Next) => {
    const start = new Date().getTime();
    await next();
    const ms = new Date().getTime() - start;

    const status = ctx.status;
    let level;
    if (status >= 500) {
      level = "error";
    } else if (status >= 400) {
      level = "warn";
    } else {
      level = "info";
    }

    let msg = `${ctx.method} ${ctx.originalUrl} ${status} ${ms}ms`;

    if (status >= 400) {
      msg += "\n" + JSON.stringify(ctx);
    }
    logger.log(level, msg);
  };
}
