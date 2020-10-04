import { AuthenticationError, gql } from "apollo-server-koa";
import { ContentType } from "../domain/zettel/entity/Revision";
import { services } from "../services";

export type Collection<T> = {
  data: T[];
  nextCursor?: number;
};

export type ZettelDTO = {
  id?: number;
  title: string | null;
  content: string;
  contentType: ContentType;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
};

export const zettelTypeDefs = gql`
  type Zettel {
    id: Int!
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
    nextCursor: Int
    data: [Zettel]
  }

  extend type Query {
    zettels: ZettelCollection
    zettel(id: Int): Zettel
  }

  extend type Mutation {
    createZettel(
      title: String
      content: String!
      contentType: ContentType!
      tags: [String]!
    ): Zettel

    updateZettel(
      id: Int!
      title: String
      content: String
      contentType: ContentType
      tags: [String]
    ): Zettel
    deleteZettel(id: Int!): Boolean
  }
`;

export const zettelResolvers = {
  Zettel: {
    contentType: (parent: { contentType: string }) => {
      switch (parent.contentType) {
        case "md":
          return "MARKDOWN";
        case "plain":
          return "PLAIN";
        default:
          console.log(parent.contentType);
          return "ERROR";
      }
    },
  },
  Query: {
    zettels: async (
      parent: any,
      { limit = 20, cursor }: { limit?: number; cursor?: number },
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
      { id }: { id: number },
      ctx: any
    ): Promise<ZettelDTO | null> => {
      if (!ctx.user) throw new AuthenticationError("Login First");
      if (!id) return null;
      const zettel = await services.zettel.getZettelById(id, ctx.user.id);
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
        contentType: givenContentType,
        tags,
      }: {
        title?: string;
        content: string;
        contentType: "MARKDONW" | "PLAIN";
        tags: string[];
      },
      ctx: any
    ): Promise<ZettelDTO | null> => {
      if (!ctx.user) throw new AuthenticationError("Login First");
      let contentType: ContentType;
      if (givenContentType === "MARKDONW") contentType = "md";
      else contentType = "plain";

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
      if (args.contentType) {
        switch (args.contentType) {
          case "MARKDOWN":
            args.contentType = "md";
            break;
          case "PLAIN":
            args.contentType = "plain";
            break;
          default:
            throw new Error("UNSUPPORTED content type: " + args.contentType);
        }
      }
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
