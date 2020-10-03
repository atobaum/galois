import dotenv from "dotenv";
import path from "path";

const env = process.env;

let filename = ".env";
if (env.NODE_ENV === "test") filename = ".test.env";

dotenv.config({
  path: path.resolve(process.cwd(), filename),
});

export default {
  clientHost: env.CLIENT_HOST,
  serverHost: env.SERVER_HOST,
  port: parseInt(env.PORT!) || 4000,
  mongodbURI: env.MONGODB_URI,
  postgresql: {
    host: env.TYPEORM_HOST,
    port: parseInt(env.TYPEORM_PORT || "5432", 10),
    username: env.TYPEORM_USERNAME,
    password: env.TYPEORM_PASSWORD,
    database: env.TYPEORM_DATABASE,
  },
  jwt: {
    secret: env.JWT_SECRET,
  },
  oauth: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
};
