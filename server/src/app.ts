import Koa from "koa";
import router from "./routes";
import logger from "koa-logger";
import bodyParser from "koa-bodyparser";
import jwtMiddleware from "./middleware/jwtMiddleware";

const app = new Koa();
app.use(logger());
app.use(bodyParser());
app.use(jwtMiddleware);
app.use(router.routes()).use(router.allowedMethods());

export default app;
