import Koa from "koa";
import koaLoader from "./koaLoader";
import postgrasqlLoader from "./postgresqlLoader";

export default async ({ koaApp }: { koaApp: Koa }) => {
  try {
    await postgrasqlLoader();
    console.log("PostgreSQL Initialized");
  } catch (e) {
    console.error("PostgreSQL Initializing Failed");
    console.log(e);
  }

  try {
    await koaLoader({ app: koaApp });
    console.log("Koa Initialized");
  } catch (e) {
    console.log("Koa Initializing Failed");
    console.log(e);
  }
  return koaApp;
};
