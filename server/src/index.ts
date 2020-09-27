import Koa from "koa";
import config from "./config";
import loaders from "./loaders";

async function startServer() {
  const app = new Koa();
  await loaders({ koaApp: app });
  app.listen(config.port, () => {
    console.log("Koa server is listening to port " + config.port);
  });
}

startServer();
