import Router from "koa-router";
import { clearTokens } from "@src/lib/token";
import googleRouter from "./google";

const auth = new Router();

auth.use("/google", googleRouter.routes());

auth.post("/logout", async (ctx) => {
  clearTokens(ctx);
  ctx.redirect("/");
});

export default auth;
