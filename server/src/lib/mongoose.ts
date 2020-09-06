import mongoose from "mongoose";
import config from "../config";

mongoose.Promise = global.Promise;
mongoose
  .connect(config.mongodbURI, { useNewUrlParser: true })
  .then(() => console.log("Successfully connected to mongodb"))
  .catch((e) => console.error("Fail to connect mongodb: ", e));
