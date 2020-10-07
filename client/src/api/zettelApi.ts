import { gql } from "@apollo/client";
import apolloClient from "../lib/apolloClient";
import { createZettelMutation, getZettelsQuery } from "./zettelQuery";

export const getZettels = async (): Promise<Zettel[]> => {
  const data = await apolloClient
    .query({
      query: getZettelsQuery,
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
    mutation: createZettelMutation,
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
