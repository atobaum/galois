import Koa from "koa";
import bodyParser from "koa-bodyparser";
import router from "../routes";
import jwtMiddleware from "../middleware/jwtMiddleware";
import { ApolloServer } from "apollo-server-koa";
import { resolvers, typeDefs } from "../graphql";
import logger from "../lib/logger";
import koaLogger from "../middleware/loggerMiddleware";
import cors from "src/middleware/cors";
import config from "../config";

export default async ({ app }: { app: Koa }): Promise<Koa> => {
  const apollo = new ApolloServer({
    resolvers,
    typeDefs,
    context: ({ ctx }: { ctx: Koa.Context }) => {
      return {
        user: ctx.state.user,
      };
    },
  });

  app.use(koaLogger(logger));
  app.use(bodyParser());
  app.use(jwtMiddleware);
  app.use(cors(config.serverHost));
  app.use(router.routes()).use(router.allowedMethods());
  apollo.applyMiddleware({ app });

  return app;
};
