import { gql, useLazyQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import apolloClient from "../lib/apolloClient";
import { setUser } from "../reducers/coreReducer";

export default function useCurrentUser() {
  // redux store => localStorage => graphql
  const user = useSelector((state: any) => state.core.user);
  const [query, { data, called, loading }] = useLazyQuery(gql`
    query GetCurrentUser {
      me {
        username
        thumbnail
      }
    }
  `);
  const dispatch = useDispatch();

  if (user) return user;

  // localStorage
  const localUser = window.localStorage["user"];
  if (localUser) {
    dispatch(setUser(JSON.parse(localUser)));
    return localUser;
  }

  // fetch
  if (!window.localStorage["access_token"]) return null;
  if (!called) query();

  if (data) {
    const userData = data.me;
    if (userData) {
      window.localStorage.setItem("user", JSON.stringify(userData));
      dispatch(setUser(userData));
    }
  }
}
