import { ConnectionOptions, createConnection, getConnection } from "typeorm";
import entities from "./entity";
import config from "./config";

const password = process.env.TYPEORM_PASSWORD;
if (!password)
  throw new Error("Failed to load database: password was not given.");

const connectionOptions: ConnectionOptions = {
  type: process.env.TYPEORM_CONNECTION as any,
  host: process.env.TYPEORM_HOST,
  database: process.env.TYPEORM_DATABASE,
  username: process.env.TYPEORM_USERNAME,
  port: parseInt(process.env.TYPEORM_PORT || "5432", 10),
  synchronize: process.env.TYPEORM_SYNCHRONIZE === "true",
  logging: process.env.TYPEORM_LOGGING === "true",
  entities,
  password,
};

createConnection(connectionOptions)
  .then(() => {
    console.log("Database connected.");
  })
  .catch((e) => {
    console.log("Cannot connect database:");
    console.log(e);
  });
