import Koa from "koa";
import logger from "koa-logger";
import bodyParser from "koa-bodyparser";
import router from "../routes";
import jwtMiddleware from "../middleware/jwtMiddleware";
import { ApolloServer } from "apollo-server-koa";
import { resolvers, typeDefs } from "../graphql";

export default async ({ app }: { app: Koa }): Promise<Koa> => {
  const apollo = new ApolloServer({
    resolvers,
    typeDefs,
  });

  app.use(logger());
  app.use(bodyParser());
  app.use(jwtMiddleware);
  app.use(router.routes()).use(router.allowedMethods());
  apollo.applyMiddleware({ app });

  return app;
};
