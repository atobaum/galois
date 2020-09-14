import React from "react";
import { useDispatch } from "react-redux";
import { getZettels } from "../api/zettelApi";
import { addZetel } from "../reducers/zettelReducer";
import { getCurrentUser } from "../api/userApi";
import { setUser } from "../reducers/coreReducer";
import { useHistory } from "react-router-dom";

export default function LoginCallbackPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const decodeQueryString = (q: string) =>
    q
      ? q
          .split("&")
          .map((a) => a.split("="))
          .reduce((acc: any, a) => {
            acc[a[0]] = decodeURIComponent(a[1]);
            return acc;
          }, {})
      : {};

  const hash = window.location.hash.slice(1);
  const params = decodeQueryString(hash);
  if (params.access_token) {
    window.localStorage.setItem("access_token", params["access_token"]);

    getZettels().then((data) => {
      data.forEach((z) => dispatch(addZetel(z)));
    });
    getCurrentUser().then((data) => dispatch(setUser(data)));
  }
  history.replace(params.next ? params.next : "/");

  return <></>;
}
