import mongoose from "mongoose";
import config from "../config";

export default async () => {
  mongoose.Promise = global.Promise;
  const connection = await mongoose.connect(config.mongodbURI!, {
    useNewUrlParser: true,
  });
  return connection.connection.db;
};
