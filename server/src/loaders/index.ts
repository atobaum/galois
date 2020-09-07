import Koa from "koa";
import "./mongooseLoader";
import koaLoader from "./koaLoader";
import mongooseLoader from "./mongooseLoader";

export default async ({ koaApp }: { koaApp: Koa }) => {
  try {
    await mongooseLoader();
    console.log("MongoDb Initialized");
  } catch {
    console.error("MongoDb Initializing Failed");
  }

  try {
    await koaLoader({ app: koaApp });
    console.log("Koa Initialized");
  } catch {
    console.log("Koa Initializing Failed");
  }
  return koaApp;
};
