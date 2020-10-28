import { gql } from "apollo-server-koa";
import { repositories, services } from "../services";

export type UserDTO = {
  id?: number;
  username: string;
  email: string;
  thumbnail?: string;
};

export const userTypeDefs = gql`
  type User {
    username: String
    thumbnail: String
  }

  type AuthTokens {
    refreshToken: String!
    accessToken: String!
  }

  extend type Query {
    me: User
  }

  extend type Mutation {
    refreshToken(refreshToken: String!): AuthTokens
  }
`;

export const userResolvers = {
  Query: {
    me: async (parent: any, args: any, ctx: any): Promise<UserDTO | null> => {
      if (!ctx.user) return null;
      const user = await repositories.user.findById(ctx.user.id);
      if (user.isLeft) return null;
      else return user.getRight().toDTO();
    },
  },
  Mutation: {
    refreshToken: async (
      parent: any,
      { refreshToken }: { refreshToken: string },
      ctx: any
    ) => {
      return await services.user.refresh(refreshToken);
    },
  },
};
