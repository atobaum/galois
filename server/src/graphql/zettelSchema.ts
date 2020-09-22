import { gql } from "apollo-server-koa";
import repository from "../repository";

export const zettelTypeDefs = gql`
  type Zettel {
    id: Int!
    version: Int!
    uuid: String!
    title: String
    content: String
    user: User!
    createdAt: Date!
  }

  extend type Query {
    zettels: [Zettel]
  }
`;

export const zettelResolvers = {
  Zettel: {
    //TODO implement
    user: () => ({}),
  },
  Query: {
    zettels: async (parent: any, args: any, ctx: any) => {
      if (!ctx.user) return null;
      const zettels = await repository.zettelRepository.findAll({
        userId: ctx.user.id,
      });
      return zettels;
    },
  },
  Mutation: {},
};
