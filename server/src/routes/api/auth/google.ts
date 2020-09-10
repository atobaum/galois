import Router from "koa-router";
import config from "../../../config";
import axios from "axios";
import jwt from "jsonwebtoken";

const authConfig = config.oauth.google;

const buildQuery = (obj: any) => {
  const list = [];
  for (let key in obj) {
    list.push([key, obj[key]].map(encodeURIComponent).join("="));
  }
  return list.join("&");
};

const router = new Router();
router.get("/login", async (ctx) => {
  const query = {
    client_id: authConfig.clientId,
    redirect_uri: config.host + "/api/auth/google/callback",
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
  const response = await axios
    .post("https://oauth2.googleapis.com/token", {
      client_id: authConfig.clientId,
      client_secret: authConfig.clientSecret,
      grant_type: "authorization_code",
      redirect_uri: config.host + "/api/auth/google/callback",
      code,
    })
    .catch((e) => {
      ctx.body = {
        error: "Fail to retrieve access_token",
        status: e.response.status,
      };
      return null;
    });
  if (response) {
    // const { access_token, expires_id, id_token } = response.data;
    const { id_token } = response.data;
    const openId = jwt.decode(id_token) as any;
    const { email, sub, name, picture } = openId;

    const access_token = jwt.sign(
      { id: 1, name, picture, email, sub: "access_token" },
      config.jwt.secret!
    );

    ctx.cookies.set("access_token", access_token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000, //1h
    });
    ctx.redirect("/");
  }
});

export default router;
