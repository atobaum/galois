import { gql } from "@apollo/client";
import apolloClient from "../lib/apolloClient";

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

  const z = data.data.zettel;
  if (z) z.createdAt = new Date(z.createdAt);
  return z;
};

export const getZettels = async (): Promise<Zettel[]> => {
  const data = await apolloClient
    .query({
      query: gql`
        query GetZettels {
          zettels {
            nextCursor
            data {
              id
              title
              content
              contentType
              tags
              createdAt
              updatedAt
            }
          }
        }
      `,
    })
    .catch((e) => console.log(e));
  // TODO error handling
  if (!data) return [];
  const collection = data.data.zettels;
  const zettels = collection.data || [];
  return zettels.map((z: any) => ({
    ...z,
    createdAt: new Date(z.createdAt),
  }));
};

export const createZettel = async (
  createZettelDTO: Omit<Zettel, "id" | "createdAt" | "updatedAt">
): Promise<Zettel> => {
  const data = await apolloClient.mutate({
    mutation: gql`
      mutation CreateZettel(
        $title: String
        $content: String!
        $tags: [String]!
      ) {
        createZettel(
          title: $title
          content: $content
          tags: $tags
          contentType: MARKDOWN
        ) {
          id
          title
          content
          contentType
          tags
          createdAt
        }
      }
    `,
    variables: createZettelDTO,
  });

  const z = data.data.createZettel;
  if (z) z.createdAt = new Date(z.createdAt);
  return z;
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
