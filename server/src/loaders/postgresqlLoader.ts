import { ConnectionOptions, createConnection, Connection } from "typeorm";
import entities from "../typeorm";
import config from "../config";

export default function postgrasqlLoader(): Promise<Connection> {
  return new Promise((resolve, reject) => {
    const connectionOptions: ConnectionOptions = {
      type: "postgres",
      host: config.postgresql.host,
      port: config.postgresql.port,
      database: config.postgresql.database,
      username: config.postgresql.username,
      password: config.postgresql.password,
      logging: process.env.TYPEORM_LOGGING === "true",
      entities,
      // heroku 연결 하기 위해
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
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
}
