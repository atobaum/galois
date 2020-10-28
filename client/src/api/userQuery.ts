import { gql } from "@apollo/client";

export const getCurrentUserQuery = gql`
  query GetCurrentUser {
    me {
      username
      thumbnail
    }
  }
`;

export const refreshTokenMutation = gql`
  mutation RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      refreshToken
      accessToken
    }
  }
`;
