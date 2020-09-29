import { ConnectionOptions, createConnection, Connection } from "typeorm";
import entities from "../typeorm";
import config from "../config";

export default function postgrasqlLoader(): Promise<Connection> {
  let logging: any;

  if (process.env.TYPEORM_LOGGING === "true") {
    logging = true;
  } else {
    logging = ["error", "warn"];
  }

  return new Promise((resolve, reject) => {
    let connectionOptions: ConnectionOptions = {
      type: "postgres",
      host: config.postgresql.host,
      port: config.postgresql.port,
      database: config.postgresql.database,
      username: config.postgresql.username,
      password: config.postgresql.password,
      logging,
      entities,
    };

    // Heroku postgresql 접속 안되서
    if (!process.env.GITHUB_RUN_ID) {
      connectionOptions = {
        ...connectionOptions,
        ssl: true,
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
      };
    }

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
