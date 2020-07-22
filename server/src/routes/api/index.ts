import Router from "koa-router";
import auth from "./auth";

const api = new Router();
api.use("/auth", auth.routes());
api.get("/todo", (ctx) => {
  ctx.body = [1, 2, 3];
});

export default api;
