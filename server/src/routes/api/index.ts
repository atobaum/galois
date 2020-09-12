import Router from "koa-router";
import Joi from "joi";
import auth from "./auth";
import ZettelRepository from "@src/repository/zettelRepository";
import checkLoggedIn from "@src/middleware/checkLoggedIn";
import userRepository from "@src/repository/userRepository";

// TODO 다른 파일로 빼기
const api = new Router();
api.use("/auth", auth.routes());

api.get("/zettel/:id", checkLoggedIn, async (ctx) => {
  let zettel;
  if (/^\d+$/.test(ctx.params.id)) {
    const id = parseInt(ctx.params.id);
    zettel = await ZettelRepository.findById({ id, userId: ctx.state.user.id });
  } else {
    zettel = await ZettelRepository.findByUUID({
      uuid: ctx.params.id,
      userId: ctx.state.user.id,
    });
  }
  if (zettel) {
    ctx.body = { zettel };
  } else {
    ctx.status = 404;
    ctx.body = { error: "NOT_FOUND" };
  }
});

api.post("/zettel", checkLoggedIn, async (ctx) => {
  const validateSchema = Joi.object({
    title: Joi.string().allow(""),
    content: Joi.string(),
    tags: Joi.array().items(Joi.string()),
  });

  const validateResult = validateSchema.validate(ctx.request.body);
  if (validateResult.error) {
    ctx.status = 400;
    ctx.body = { error: "BAD_REQUEST", detail: validateResult.error.details };
    return;
  } else {
    const zettel = await ZettelRepository.create({
      ...ctx.request.body,
      user: { id: ctx.state.user.id },
    });
    if (!zettel) {
      ctx.status = 500;
      ctx.body = {
        error: "FAIL_TO_CRETAE_ZETTEL",
      };
      return;
    } else {
      ctx.body = zettel;
      return;
    }
  }
});

api.delete("/zettel/:id", checkLoggedIn, async (ctx) => {
  // TODO uuid support
  const id = parseInt(ctx.params.id);
  if (isNaN(id)) {
    ctx.status = 400;
    ctx.body = {
      error: "Invalid id",
    };
    return;
  }

  const deleted = await ZettelRepository.delete({
    id,
    userId: ctx.state.user.id,
  });
  //TODO error handling
  if (deleted) ctx.status = 204;
  else ctx.status = 404;
});

api.put("/zettel/:id", checkLoggedIn, async (ctx) => {
  ctx.body = "send";
});

api.get("/zettels", checkLoggedIn, async (ctx) => {
  const zettels = await ZettelRepository.findAll({
    userId: ctx.state.user.id,
  });
  ctx.body = { zettels };
});

api.get("/user/mine", async (ctx) => {
  if (!ctx.state.user) {
    ctx.status = 204;
    return;
  }

  const user = await userRepository.findById(ctx.state.user.id);
  if (user) {
    ctx.body = {
      id: user.id,
      username: user.username,
      picture: user.picture,
    };
  } else {
    ctx.status = 500;
    // TODO Loggin Inconsistent
  }
});

export default api;
