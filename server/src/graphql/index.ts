import { gql } from "apollo-server-koa";
import { userResolvers, userTypeDefs } from "./userSchema";
import { zettelResolvers, zettelTypeDefs } from "./zettelSchema";

const rootTypeDef = gql`
  scalar Date
  scalar JSON

  type Query {
    version: String
  }

  type Mutation {
    echo: String
  }
`;

const rootResolver = {
  Query: {
    version: () => process.env.npm_package_version,
  },
};

export const typeDefs = [rootTypeDef, userTypeDefs, zettelTypeDefs];
export const resolvers = [rootResolver, userResolvers, zettelResolvers];
