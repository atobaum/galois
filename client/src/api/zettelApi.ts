import { gql } from "@apollo/client";
import apolloClient from "../lib/apolloClient";
import { Zettel } from "../models/Zettel";

export const getZettel = async (id: number | string): Promise<Zettel> => {
  const data = await apolloClient.query({
    query: gql`
      query GetZettle($id: Int, $uuid: String) {
        zettel(id: $id, uuid: $uuid) {
          id
          uuid
          version
          title
          content
          tags
          createdAt
          user {
            username
          }
        }
      }
    `,
    variables: {
      id: typeof id === "number" ? id : undefined,
      uuid: typeof id === "string" ? id : undefined,
    },
  });
  return data.data.zettel;
};

export const getZettels = async (): Promise<Zettel[]> => {
  const data = await apolloClient.query({
    query: gql`
      query GetZettels {
        zettels {
          id
          uuid
          version
          title
          content
          tags
          createdAt
          user {
            username
          }
        }
      }
    `,
  });
  // TODO error handling
  return data.data.zettels.map((z: any) => ({
    ...z,
    createdAt: new Date(z.createdAt),
  }));
};

export const createZettel = async (
  createZettelDTO: Pick<Zettel, "title" | "content" | "tags">
): Promise<Zettel> => {
  const data = await apolloClient.mutate({
    mutation: gql`
      mutation CreateZettel(
        $title: String
        $content: String!
        $tags: [String]!
      ) {
        createZettel(title: $title, content: $content, tags: $tags) {
          id
          uuid
          version
          title
          content
          tags
          createdAt
          user {
            username
          }
        }
      }
    `,
    variables: createZettelDTO,
  });
  return data.data.createZettel;
};

export const deleteZettel = async (id: number): Promise<boolean> => {
  const data = await apolloClient.mutate({
    mutation: gql`
      mutation DeleteZettel($id: Int!) {
        deleteZettel(id: $id)
      }
    `,
    variables: {
      id,
    },
  });
  return data.data.deleteZettel;
};
