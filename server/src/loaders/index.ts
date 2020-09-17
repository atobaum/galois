import Koa from "koa";
import koaLoader from "./koaLoader";
import postgrasqlLoader from "./postgresqlLoader";
import logger from "../lib/logger";

export default async ({ koaApp }: { koaApp: Koa }) => {
  try {
    await postgrasqlLoader();
    logger.info("PostgreSQL Initialized");
  } catch (e) {
    logger.error(`PostgreSQL Initializing Failed: ${e}`);
  }

  try {
    await koaLoader({ app: koaApp });
    logger.info("Koa Initialized");
  } catch (e) {
    logger.info(`Koa Initializing Failed: ${e}`);
  }
  return koaApp;
};
