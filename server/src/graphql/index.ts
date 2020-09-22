import { gql } from "apollo-server-koa";

const rootTypeDef = gql`
  type Query {
    version: String
  }
`;

const rootResolver = {
  Query: {
    version: () => "0.0.1",
  },
};

export const typeDefs = [rootTypeDef];
export const resolvers = [rootResolver];
