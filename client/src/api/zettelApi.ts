import { gql } from "@apollo/client";
import apolloClient from "../lib/apolloClient";
import { createZettelMutation, updateZettelQuery } from "./zettelQuery";

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
