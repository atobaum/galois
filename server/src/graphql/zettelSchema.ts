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
    deleteZettel(id: Int): Boolean
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
      const zettels = await repository.zettelRepository.findAll({
        userId: ctx.user.id,
      });
      return zettels;
    },
    zettel: async (
      parent: any,
      { id, uuid }: { id: number; uuid: string },
      ctx: any
    ) => {
      if (!(ctx.user && (id || uuid))) return null;
      const args = { userId: ctx.user.id, id, uuid };
      const zettel = (await repository.zettelRepository.findAll(args))[0];

      return zettel;
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
      if (!ctx.user) return null;

      const zettel = await repository.zettelRepository.create({
        title,
        content,
        tags,
        userId: ctx.user.id,
      });
      return zettel;
    },
  },
};
