import "./env";
import "./database";
import apolloServer from "./graphql/apolloServer";
import app from "./app";

apolloServer.applyMiddleware({ app });

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("Koa server is listening to port " + port);
});
