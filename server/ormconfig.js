const path = require("path");
const dotenv = require("dotenv");
dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

const env = process.env;

const config = {
  type: "postgres",
  host: env.TYPEORM_HOST,
  port: Number(env.TYPEORM_PORT),
  username: env.TYPEORM_USERNAME,
  password: env.TYPEORM_PASSWORD,
  database: env.TYPEORM_DATABASE,
  synchronize: true,
  logging: false,
  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
};

// Heroku postgresql 접속 안되서
if (!env.GITHUB_RUN_ID) {
  config.ssl = true;
  config.extra = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

module.exports = config;
