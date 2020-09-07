import Koa from "koa";
import logger from "koa-logger";
import bodyParser from "koa-bodyparser";
import router from "../routes";
// import jwtMiddleware from "./middleware/jwtMiddleware";

export default async ({ app }: { app: Koa }): Promise<Koa> => {
  app.use(logger());
  app.use(bodyParser());
  // app.use(jwtMiddleware);
  app.use(router.routes()).use(router.allowedMethods());

  return app;
};
