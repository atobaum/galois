import { ConnectionOptions, createConnection, Connection } from "typeorm";
import entities from "../entity";
import config from "../config";

const postgrasqlLoader: Promise<Connection> = new Promise((resolve, reject) => {
  const connectionOptions: ConnectionOptions = {
    type: "postgres",
    host: config.postgresql.host,
    database: config.postgresql.database,
    username: config.postgresql.username,
    password: config.postgresql.password,
    port: config.postgresql.port,
    synchronize: process.env.TYPEORM_SYNCHRONIZE === "true",
    logging: process.env.TYPEORM_LOGGING === "true",
    entities,
  };
  createConnection(connectionOptions)
    .then((conn) => {
      console.log("Database connected.");
      resolve(conn);
    })
    .catch((e) => {
      console.log("Cannot connect database:");
      reject(e);
    });
});

export default postgrasqlLoader;
