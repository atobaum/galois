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
  port: parseInt(env.PORT!) || 4000,
  mongodbURI: env.MONGODB_URI || "",
  jwt: {
    secret: env.JWT_SECRET,
  },
};
