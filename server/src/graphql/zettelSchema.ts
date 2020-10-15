import { ContentType } from "../domain/zettel/entity/Zettle";
import { AuthenticationError, gql } from "apollo-server-koa";
import { services } from "../services";

export type Collection<T> = {
  data: T[];
  nextCursor?: string;
};

export type ZettelDTO = {
  id?: string;
  number?: number;
  title: string | null;
  content: string;
  contentType: ContentType;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
};

export const zettelTypeDefs = gql`
  type Zettel {
    id: ID!
    number: Int!
    title: String
    content: String!
    contentType: ContentType!
    tags: [String]!
    createdAt: Date!
    updatedAt: Date!
  }

  enum ContentType {
    PLAIN
    MARKDOWN
  }

  type ZettelCollection {
    nextCursor: String
    data: [Zettel]
  }

  extend type Query {
    zettels(limit: Int, cursor: String): ZettelCollection
    zettel(number: Int): Zettel
  }

  extend type Mutation {
    createZettel(
      title: String
      content: String!
      contentType: ContentType!
      tags: [String]!
    ): Zettel

    updateZettel(
      id: ID!
      title: String
      content: String
      contentType: ContentType
      tags: [String]
    ): Zettel
    deleteZettel(id: Int!): Boolean
  }
`;

export const zettelResolvers = {
  ContentType,
  Query: {
    zettels: async (
      parent: any,
      { limit = 20, cursor }: { limit?: number; cursor?: string },
      ctx: any
    ): Promise<Collection<ZettelDTO> | null> => {
      if (!ctx.user) throw new AuthenticationError("Login First");
      const result = await services.zettel.findZettels(
        { limit, cursor },
        ctx.user.id
      );

      if (result.isLeft) return null;
      else return result.getRight();
    },

    zettel: async (
      parent: any,
      { number }: { number: number },
      ctx: any
    ): Promise<ZettelDTO | null> => {
      if (!ctx.user) throw new AuthenticationError("Login First");
      if (!number) return null;
      const zettel = await services.zettel.getZettelByNumber(
        number,
        ctx.user.id
      );
      if (zettel.isLeft) return null;

      return zettel.getRight().toDTO();
    },
  },
  Mutation: {
    createZettel: async (
      parent: any,
      {
        title,
        content,
        contentType,
        tags,
      }: {
        title?: string;
        content: string;
        contentType: ContentType;
        tags: string[];
      },
      ctx: any
    ): Promise<ZettelDTO | null> => {
      if (!ctx.user) throw new AuthenticationError("Login First");

      const zettel = await services.zettel.createZettel(
        {
          title: title || null,
          content,
          contentType,
          tags,
        },
        ctx.user.id
      );
      if (zettel.isLeft) return null;
      else return zettel.getRight().toDTO();
    },
    updateZettel: async (parent: any, args: any, ctx: any) => {
      if (!ctx.user) throw new AuthenticationError("Login First");
      const zettel = await services.zettel.updateZettel(args, ctx.user.id);
      if (zettel.isLeft) return null;
      else return zettel.getRight().toDTO();
    },
    deleteZettel: async (
      parent: any,
      { id }: { id: number },
      ctx: any
    ): Promise<boolean> => {
      if (!ctx.user) throw new AuthenticationError("Login First");
      const deleted = await services.zettel.removeZettel(id, ctx.user.id);
      return deleted;
    },
  },
};
