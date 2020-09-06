import "./env";
// import "./database";
import app from "./app";
import "./lib/mongoose";
import config from "./config";

app.listen(config.port, () => {
  console.log("Koa server is listening to port " + config.port);
});
