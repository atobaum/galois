import Router from "koa-router";
import Joi from "joi";
import auth from "./auth";
import ZettelRepository from "../../repository/zettelRepository";

// TODO 다른 파일로 빼기
const checkLoggedIn = async (ctx: any, next: any) => {
  if (!ctx.state.user) {
    ctx.status = 401;
    ctx.body = {
      error: "NOT_AUTHENTICATED",
      message: "Login first.",
    };
  } else await next();
};
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
    const zettel = await ZettelRepository.create(ctx.request.body);
    if (!zettel) {
      ctx.status = 500;
      ctx.body = {
        error: "FAIL_TO_CRETAE_ZETTEL",
      };
    } else {
      ctx.body = zettel;
    }
  }
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

export default api;
