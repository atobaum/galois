import supertest from "supertest";
import Koa from "koa";
import { Server } from "http";
import cors from "../cors";

describe("cors middleware", () => {
  let server: Server;
  beforeAll(() => {
    let app: Koa;
    app = new Koa();
    app.use(cors("https://allowed.com"));
    server = app.listen();
  });
  afterAll(() => {
    server.close();
  });

  it("allows origin given by parameter", () => {
    const request = supertest(server);
    const origin = "https://allowed.com";

    return request
      .get("/")
      .set("Origin", origin)
      .expect("Access-Control-Allow-Origin", origin);
  });

  it("disallows origin not given by parameter", () => {
    const request = supertest(server);
    const origin = "https://disallowed.com";

    return request
      .get("/")
      .set("Origin", origin)
      .expect((res) => {
        expect(res.header["Access-Control-Allow-Origin"]).toBeFalsy();
      });
  });
});
