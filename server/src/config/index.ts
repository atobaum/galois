import dotenv from "dotenv";
import path from "path";

const env = process.env;
const { NODE_ENV } = env;

dotenv.config({
  path: path.resolve(
    process.cwd(),
    NODE_ENV === "development" ? ".dev.env" : ".env"
  ),
});

export default {
  host: env.HOST,
  port: parseInt(env.PORT!) || 4000,
  mongodbURI: env.MONGODB_URI || "",
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
