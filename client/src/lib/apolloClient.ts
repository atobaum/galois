import { ApolloClient, InMemoryCache } from "@apollo/client";

export default new ApolloClient({
  uri: (process.env.REACT_APP_API_URL || "") + "/graphql",
  cache: new InMemoryCache(),
  headers: {
    Authorization: window.localStorage.getItem("access_token")
      ? "Bearer " + window.localStorage.getItem("access_token")
      : "",
  },
});
