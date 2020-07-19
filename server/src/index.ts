import "./env";
// import "./database";
import app from "./app";

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("Koa server is listening to port " + port);
});
