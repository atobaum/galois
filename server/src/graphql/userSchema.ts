import { gql } from "apollo-server-koa";
import { repositories } from "../services";

export const userTypeDefs = gql`
  type User {
    username: String
    thumbnail: String
  }

  extend type Query {
    me: User
  }
`;

export const userResolvers = {
  Query: {
    me: async (parent: any, args: any, ctx: any) => {
      if (!ctx.user) return null;
      const user = await repositories.user.findById(ctx.user.id);
      return user;
    },
  },
};
