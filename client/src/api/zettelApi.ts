import { gql } from "@apollo/client";
import apolloClient from "../lib/apolloClient";
import {
  createZettelMutation,
  getZettelsQuery,
  updateZettelQuery,
} from "./zettelQuery";

export const getZettels = async (cursor?: string): Promise<Zettel[]> => {
  console.warn("getZettels is deprecated");
  const data = await apolloClient
    .query({
      query: getZettelsQuery,
      variables: {
        limit: 10,
        cursor,
      },
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
  createZettelDTO: NewZettel
): Promise<Zettel> => {
  const data = await apolloClient.mutate({
    mutation: createZettelMutation,
    variables: createZettelDTO,
  });

  const z = data.data.createZettel;
  if (z) {
    z.createdAt = new Date(z.createdAt);
    z.updatedAt = new Date(z.updatedAt);
  }
  return z;
};

export const updateZettel = async (zettel: Zettel) => {
  const data = await apolloClient.mutate({
    mutation: updateZettelQuery,
    variables: zettel,
  });

  const z = data.data.updateZettel;
  if (z) {
    z.createdAt = new Date(z.createdAt);
    z.updatedAt = new Date(z.updatedAt);
  }
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
