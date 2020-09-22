import { gql } from "apollo-server-koa";
import { userResolvers, userTypeDefs } from "./userSchema";
import { zettelResolvers, zettelTypeDefs } from "./zettelSchema";

const rootTypeDef = gql`
  scalar Date

  type Query {
    version: String
  }

  type Mutation {
    echo: String
  }
`;

const rootResolver = {
  Query: {
    version: () => "0.0.1",
  },
};

export const typeDefs = [rootTypeDef, userTypeDefs, zettelTypeDefs];
export const resolvers = [rootResolver, userResolvers, zettelResolvers];
