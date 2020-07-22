import request from "supertest";
import app from "../app";

describe("/api/zettels", () => {
  const server = request(app.callback());
  it("get zettels", async () => {
    const response = await server.get("/api/zettels");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: 1, content: "zettel1", tags: ["tag1"] },
      2,
      3,
    ]);
  });
});
