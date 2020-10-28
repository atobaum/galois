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
import logout from "./logout";

function createHeaders() {
  const headers: any = {};
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) headers.Authorization = "Bearer " + accessToken;

  return headers;
}

const httpLink = new HttpLink({
  uri: (process.env.REACT_APP_API_URL || "") + "/graphql",
  headers: createHeaders(),
});

const checkUnauthenticatedError = (
  graphqlErrors: readonly GraphQLError[] | undefined
): boolean => {
  if (
    graphqlErrors &&
    graphqlErrors[0] &&
    graphqlErrors[0].extensions!.code === "UNAUTHENTICATED"
  )
    return true;
  return false;
};

function setTokensToLocalStorage(tokens: {
  refreshToken: string;
  accessToken: string;
}) {
  localStorage.setItem("refresh_token", tokens.refreshToken);
  localStorage.setItem("access_token", tokens.accessToken);
}

const errorLink = onError(
  ({ networkError, graphQLErrors, forward, operation }) => {
    if (!networkError && !checkUnauthenticatedError(graphQLErrors)) return;

    const code = (networkError as any)?.statusCode;
    const result = (networkError as any)?.result;

    if (code === 504) {
      // Dispatch redux action using dom event
      // Add event listener in App.tsx
      const evt = new CustomEvent("dispatch-redux", {
        detail: showToast("서버 접속 불가"),
      });

      dispatchEvent(evt);
    } else if (
      (code === 401 && result.code === "EXPIRED_ACCESS_TOKEN") ||
      checkUnauthenticatedError(graphQLErrors)
    ) {
      localStorage.removeItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        return fromPromise(
          client
            .mutate({
              mutation: refreshTokenMutation,
              variables: { refreshToken },
            })
            .then((data) => {
              if (!data || !data.data.refreshToken) throw new Error();
              else return data.data.refreshToken;
            })
            .catch(() => {
              logout();
            })
        ).flatMap((tokens) => {
          setTokensToLocalStorage(tokens);

          operation.setContext(({ headers = {} }) => {
            return {
              headers: {
                ...headers,
                authorization: "Bearer " + tokens.accessToken,
              },
            };
          });
          return forward(operation);
        });
      } else {
        logout();
      }
    }
  }
);

const link = errorLink.concat(httpLink);

const client = new ApolloClient({
  link,
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
