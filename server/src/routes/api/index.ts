import Router from "koa-router";
import Joi from "joi";
import { ZettelRepository } from "../../models/Zettel";

import auth from "./auth";

const api = new Router();
api.use("/auth", auth.routes());

api.get("/zettel/:id", async (ctx) => {
  let zettel;
  if (/^\d+$/.test(ctx.params.id)) {
    const id = parseInt(ctx.params.id);
    zettel = await ZettelRepository.findById(id);
  } else {
    zettel = await ZettelRepository.findByUUID(ctx.params.id);
  }
  if (zettel) {
    ctx.body = { zettel };
  } else {
    ctx.status = 404;
    ctx.body = { error: "NOT_FOUND" };
  }
});
api.post("/zettel", async (ctx) => {
  const validateSchema = Joi.object({
    id: Joi.number(),
    version: Joi.number().min(1).required(),
    title: Joi.string(),
    content: Joi.string(),
    tags: Joi.array().items(Joi.string()),
  });

  const validateResult = validateSchema.validate(ctx.request.body);
  if (validateResult.error) {
    ctx.status = 400;
    ctx.body = { error: "BAD_REQUEST" };
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

api.delete("/zettel/:id", async (ctx) => {
  ctx.body = "send";
});
api.put("/zettel/:id", async (ctx) => {
  ctx.body = "send";
});
api.get("/zettels", async (ctx) => {
  const zettels = await ZettelRepository.findAll();
  ctx.body = { zettels };
});

export default api;
