import Router from "koa-router";
import { getRepository } from "typeorm";
import User from "../../../entity/User";
import { setTokens, clearTokens } from "../../../lib/token";

const auth = new Router();

auth.post("/login", async (ctx) => {
  const { email, password } = ctx.request.body;
  if (!(email && password)) {
    ctx.body = {
      error: "Missing email or password",
    };
    ctx.status = 401;
    return;
  }

  const user = await getRepository(User).findOne({ email });
  if (user && (await user.checkPassword(password))) {
    const userToken = await user.generateAuthTokens();
    setTokens(ctx, userToken);

    ctx.body = {
      access_token: userToken.accessToken,
      refresh_token: userToken.refreshToken,
    };
  } else {
    ctx.body = {
      error: "Invalid user infomation",
    };
    ctx.status = 401;
    return;
  }
});

auth.post("/logout", async (ctx) => {
  clearTokens(ctx);
  ctx.status = 205;
});

export default auth;
