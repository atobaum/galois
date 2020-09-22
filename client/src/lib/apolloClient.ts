import { ApolloClient, InMemoryCache } from "@apollo/client";

export default new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
  headers: {
    Authorization: window.localStorage.getItem("access_token")
      ? "Bearer " + window.localStorage.getItem("access_token")
      : "",
  },
});
