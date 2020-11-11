import { refreshTokenMutation } from "../api/userQuery";
import client from "./apolloClient";

const refreshTokens = (refreshToken: string): Promise<AuthTokens | null> => {
  return client
    .mutate({
      mutation: refreshTokenMutation,
      variables: { refreshToken },
    })
    .then((data) => {
      if (!data || !data.data.refreshToken) throw new Error();

      return data.data.refreshToken;
    });
};
export default refreshTokens;
