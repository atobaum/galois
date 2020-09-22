import Axios, { AxiosRequestConfig, Method } from "axios";

const apiURL = process.env.API_URL || "";

export default function apiWrapper(url: string, method: Method, options?: any) {
  const access_token = window.localStorage.getItem("access_token");
  const option: AxiosRequestConfig = {
    method,
    url: apiURL + url,
  };
  if (access_token)
    option.headers = { Authorization: "Bearer " + access_token };
  if (options) {
    if (options.data) {
      option.data = options.data;
    }
  }

  return Axios(option);
}
