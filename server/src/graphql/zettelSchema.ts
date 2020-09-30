import { AuthenticationError, gql } from "apollo-server-koa";
import { ContentType } from "../domain/zettel/entity/Revision";
import Zettel from "../domain/zettel/entity/Zettle";
import { services } from "../services";
import { UserDTO } from "./userSchema";

export type Collection<T> = {
  data: T[];
  nextCursor: number | string;
};

export type ZettelDTO = {
  id?: number;
  version?: number;
  uuid?: string;
  title: string | null;
  content: string;
  contentType: ContentType;
  user: UserDTO;
  tags: string[];
  createdAt: Date;
};

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

  enum ContentType {
    PLAIN
    MARKDOWN
  }

  extend type Query {
    zettels: [Zettel]
    zettel(id: Int, uuid: String): Zettel
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
    # deleteZettelRevision(uuid: String!): Boolean
  }
`;

export const zettelResolvers = {
  Zettel: {
    //TODO implement
    user: () => ({}),
  },
  Query: {
    zettels: async (
      parent: any,
      { limit = 20, cursor }: { limit?: number; cursor?: number },
      ctx: any
    ): Promise<Collection<ZettelDTO> | null> => {
      if (!ctx.user) return null;
      const zettelCollection = await services.zettel.findZettels(
        { limit, cursor },
        ctx.user.id
      );
      return {
        ...zettelCollection,
        data: zettelCollection.data.map((z) => z.toDTO()),
      };
    },
    zettel: async (
      parent: any,
      { id, uuid }: { id?: number; uuid?: string },
      ctx: any
    ): Promise<ZettelDTO | null> => {
      if (!ctx.user) throw new AuthenticationError("Login First");
      if (!(id || uuid)) return null;
      let zettel: Zettel | null = null;
      if (uuid)
        zettel = await services.zettel.getZettelByUUID(uuid, ctx.user.id);
      else if (id)
        zettel = await services.zettel.getZettelById({ id }, ctx.user.id);

      if (zettel) return zettel.toDTO();
      else return null;
    },
  },
  Mutation: {
    createZettel: async (
      parent: any,
      {
        title,
        content,
        contentType = "plain",
        tags,
      }: {
        title?: string;
        content: string;
        contentType: ContentType;
        tags: string[];
      },
      ctx: any
    ): Promise<ZettelDTO> => {
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
      return zettel.toDTO();
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
