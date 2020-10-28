import {
  ApolloClient,
  fromPromise,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { GraphQLError } from "graphql";
import { refreshTokenMutation } from "../api/userQuery";
import { showToast } from "../redux/modules/toast";
import { setAuthTokensToLocalStorage } from "../utils";
import logout from "./logout";

function createHeaders() {
  const headers: any = {};
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) headers.Authorization = "Bearer " + accessToken;

  return headers;
}

function checkExporedAccessTokenError(statusCode: number, errorCode: string) {
  return statusCode === 401 && errorCode === "EXPIRED_ACCESS_TOKEN";
}

function checkUnauthenticatedError(
  graphqlErrors: readonly GraphQLError[] | undefined
): boolean {
  if (
    graphqlErrors &&
    graphqlErrors[0] &&
    graphqlErrors[0].extensions!.code === "UNAUTHENTICATED"
  )
    return true;
  return false;
}

const refreshTokens = (refreshToken: string | null): Promise<AuthTokens> => {
  if (!refreshToken) return Promise.reject(new Error());

  return client
    .mutate({
      mutation: refreshTokenMutation,
      variables: { refreshToken },
    })
    .then((data) => {
      if (!data || !data.data.refreshToken) throw new Error();
      else return data.data.refreshToken;
    });
};

function refreshTokensObservable(refreshToken: string | null) {
  return fromPromise(
    refreshTokens(refreshToken).catch(() => logout())
  ).filter((v) => Boolean(v));
}

const httpLink = new HttpLink({
  uri: (process.env.REACT_APP_API_URL || "") + "/graphql",
  headers: createHeaders(),
});

const errorLink = onError(
  ({ networkError = {}, graphQLErrors, forward, operation }) => {
    if (!networkError && !checkUnauthenticatedError(graphQLErrors)) return;

    const { code, result } = networkError as any;
    if (code === 504) {
      // Dispatch redux action using dom event
      // Add event listener in App.tsx
      const evt = new CustomEvent("dispatch-redux", {
        detail: showToast("서버 접속 불가"),
      });

      dispatchEvent(evt);
    } else if (
      checkExporedAccessTokenError(code, result ? result.code : "") ||
      checkUnauthenticatedError(graphQLErrors)
    ) {
      localStorage.removeItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");
      return refreshTokensObservable(refreshToken).flatMap((tokens) => {
        setAuthTokensToLocalStorage(tokens as AuthTokens);
        operation.setContext(({ headers = {} }) => {
          return {
            headers: {
              ...headers,
              ...createHeaders(),
            },
          };
        });
        return forward(operation);
      });
    }
  }
);

const client = new ApolloClient({
  link: errorLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Zettel: {
        fields: {
          tags: {
            merge(existing = [], incoming: any[]) {
              return incoming;
            },
          },
        },
      },
    },
  }),
});

export default client;
