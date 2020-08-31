import Router from "koa-router";
import auth from "./auth";

const api = new Router();
api.use("/auth", auth.routes());
api.get("/zettel", async (ctx) => {
  ctx.body = "send";
});
api.delete("/zettel", async (ctx) => {
  ctx.body = "send";
});
api.put("/zettel", async (ctx) => {
  ctx.body = "send";
});
api.get("/zettels", async (ctx) => {
  ctx.body = {
    zettels: [
      {
        id: 1,
        content: "test11",
        tags: ["inbox", "tag1"],
        title: null,
      },
      {
        id: 2,
        content: "test2",
        tags: ["tag2"],
        title: null,
      },
      {
        id: 3,
        content: "test3",
        tags: ["tag3"],
        title: null,
      },
      {
        id: 4,
        content: "test4",
        tags: ["tag4", "inbox"],
        title: "title",
      },
    ],
  };
});

export default api;
