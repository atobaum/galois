import Koa from "koa";
import http from "http";
import config from "./config";
import loaders from "./loaders";
import logger from "./lib/logger";

async function startServer() {
  const app = new Koa();
  await loaders({ koaApp: app });
  const server = http.createServer(app.callback());
  server.on("listening", () => {
    logger.info("Koa server is listening to port " + config.port);
  });

  server.on("error", (e) => {
    logger.error("Koa server failed to listen: " + e);
  });

  server.listen(config.port);
}

startServer();
