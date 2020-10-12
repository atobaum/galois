import Router from "koa-router";
import googleRouter from "./google";

const auth = new Router();

auth.use("/google", googleRouter.routes());

auth.get("/logout", async (ctx) => {
  // TODO revoke token
  ctx.redirect("/");
});

export default auth;
