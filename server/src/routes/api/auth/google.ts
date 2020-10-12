import Router from "koa-router";
import axios from "axios";
import jwt from "jsonwebtoken";
import config from "../../../config";
import { services } from "../../../services";

const authConfig = config.oauth.google;

const buildQuery = (obj: any) => {
  const list = [];
  for (let key in obj) {
    list.push([key, obj[key]].map(encodeURIComponent).join("="));
  }
  return list.join("&");
};

const router = new Router();
router.get("/redirect", async (ctx) => {
  const query = {
    client_id: authConfig.clientId,
    redirect_uri: config.serverHost + "/api/auth/google/callback", //server
    response_type: "code",
    scope: "profile email openid",
    access_type: "online",
    include_granted_scopes: "true",
  };
  ctx.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${buildQuery(query)}`
  );
});

router.get("/callback", async (ctx) => {
  const { code } = ctx.query;
  if (!code) {
    ctx.body = {
      error: "Fail to retrieve code",
    };
    return;
  }

  const response = await axios
    .post("https://oauth2.googleapis.com/token", {
      client_id: authConfig.clientId,
      client_secret: authConfig.clientSecret,
      grant_type: "authorization_code",
      redirect_uri: config.serverHost + "/api/auth/google/callback", //server
      code,
    })
    .catch((e) => {
      ctx.redirect(config.clientHost + `/login_callback`);
      return null;
    });

  if (!response) return;

  // const { access_token, expires_id, id_token } = response.data;
  const { id_token } = response.data;
  const openId = jwt.decode(id_token) as any;
  const { email, sub, name, picture } = openId;

  let authTokens = await services.user.login("google", sub + "");
  // if (!authTokens) {
  //   authTokens = await services.user.join({
  //     username: name,
  //     socialAccount: { provider: "google", socialId: sub + "" },
  //     thumbnail: picture,
  //     email,
  //   });
  // }

  if (!authTokens) {
    ctx.redirect(config.clientHost + `/login_callback`);
  } else {
    ctx.redirect(
      config.clientHost +
        `/login_callback#access_token=${encodeURIComponent(
          // client
          authTokens.accessToken
        )}&refresh_token=${encodeURIComponent(authTokens.refreshToken)}`
    );
  }
});

export default router;
