import { gql } from "@apollo/client";
import apolloClient from "../lib/apolloClient";

export const getCurrentUser = async () => {
  const result = await apolloClient.query({
    query: gql`
      query GetCurrentUser {
        me {
          username
          thumbnail
        }
      }
    `,
  });
  if (result.data) return result.data.me;
  else return null;
};
