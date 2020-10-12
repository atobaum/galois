import React from "react";
import { useHistory } from "react-router-dom";
import { showToast } from "../redux/modules/toast";
import { useDispatch } from "react-redux";

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
    //TODO 그 전의 url로 가기
    window.location.href = params.next ? params.next : "/";
  } else {
    dispatch(showToast("로그인 실패"));
    history.push("/");
  }

  return <></>;
}
