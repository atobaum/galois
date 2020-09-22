import { gql } from "apollo-server-koa";
import { userResolvers, userTypeDefs } from "./userSchema";

const rootTypeDef = gql`
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

export const typeDefs = [rootTypeDef, userTypeDefs];
export const resolvers = [rootResolver, userResolvers];
