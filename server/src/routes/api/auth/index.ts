import Router from "koa-router";
import { clearTokens } from "../../../lib/token";
import googleRouter from "./google";

const auth = new Router();

auth.use("/google", googleRouter.routes());

auth.get("/logout", async (ctx) => {
  clearTokens(ctx);
  ctx.redirect("/");
});

export default auth;
