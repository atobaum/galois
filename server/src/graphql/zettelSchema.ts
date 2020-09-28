import { AuthenticationError, gql } from "apollo-server-koa";
import { repositories, services } from "../services";

export const zettelTypeDefs = gql`
  type Zettel {
    id: Int!
    version: Int!
    uuid: String!
    title: String
    content: String
    user: User!
    tags: [String]!
    createdAt: Date!
  }

  extend type Query {
    zettels: [Zettel]
    zettel(id: Int, uuid: String): Zettel
  }

  extend type Mutation {
    createZettel(title: String, content: String!, tags: [String]!): Zettel
    updateZettel(
      id: Int
      title: String
      content: String
      tags: [String]
    ): Zettel
    deleteZettel(id: Int!): Boolean
    deleteZettelRevision(uuid: String!): Boolean
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
      const zettels = await repositories.zettel.findAll({
        userId: ctx.user.id,
      });
      return zettels;
    },
    zettel: async (
      parent: any,
      { id, uuid }: { id: number; uuid: string },
      ctx: any
    ) => {
      if (!ctx.user) throw new AuthenticationError("Login First");
      if (!(id || uuid)) return null;
      if (uuid) return services.zettel.getZettelByUUID(uuid, ctx.user.id);
      else return services.zettel.getZettelById(id, ctx.user.id);
    },
  },
  Mutation: {
    createZettel: async (
      parent: any,
      {
        title,
        content,
        tags,
      }: { title?: string; content: string; tags: string[] },
      ctx: any
    ) => {
      if (!ctx.user) throw new AuthenticationError("Login First");

      const zettel = await services.zettel.createZettel({
        title,
        content,
        tags,
        userId: ctx.user.id,
      });
      return zettel;
    },
    deleteZettel: async (parent: any, { id }: { id: number }, ctx: any) => {
      if (!ctx.user) throw new AuthenticationError("Login First");
      const deleted = await services.zettel.removeZettel(id, ctx.user.id);
      return deleted;
    },
  },
};
