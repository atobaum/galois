import { setAuthTokensToLocalStorage } from "../utils";
import logout from "./logout";
import refreshTokens from "./refreshTokens";

const customFetch = (uri: RequestInfo, options?: RequestInit) =>
  fetch(uri, options).then(async (res) => {
    if (res.status === 401) {
      const code = (await res.json()).code;
      if (code === "EXPIRED_ACCESS_TOKEN") {
        localStorage.removeItem("access_token");
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) {
          logout();
          return res;
        } else {
          //refresh
          const tokens = await refreshTokens(refreshToken);
          if (!tokens) {
            logout();
            return res;
          }
          setAuthTokensToLocalStorage(tokens as AuthTokens);

          return fetch(uri, {
            ...options,
            headers: {
              ...options?.headers,
              authorization: "Bearer " + tokens.accessToken,
            },
          });
        }
      } else {
        return res;
      }
    } else {
      return res;
    }
  });

export default customFetch;
