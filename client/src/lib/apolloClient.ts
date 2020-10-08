import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { showToast } from "../redux/modules/toast";
import logout from "./logout";

const httpLink = new HttpLink({
  uri: (process.env.REACT_APP_API_URL || "") + "/graphql",
  headers: {
    Authorization: window.localStorage.getItem("access_token")
      ? "Bearer " + window.localStorage.getItem("access_token")
      : "",
  },
});

const errorLink = onError(({ networkError }) => {
  if (!networkError) return;

  const code = (networkError as any).statusCode;
  const result = (networkError as any).result;

  if (code === 504) {
    // Dispatch redux action using dom event
    // Add event listener in App.tsx
    const evt = new CustomEvent("dispatch-redux", {
      detail: showToast("서버 접속 불가"),
    });

    dispatchEvent(evt);
  } else if (code === 401 && result.code === "EXPIRED_ACCESS_TOKEN") {
    // TODO refresh token
    logout();
  }
});

const link = errorLink.concat(httpLink);

export default new ApolloClient({
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
