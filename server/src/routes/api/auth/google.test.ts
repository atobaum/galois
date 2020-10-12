import axios from "axios";
import Koa from "koa";
import supertest from "supertest";
import googleRouter from "./google";
import jwt from "jsonwebtoken";

jest.mock("axios", () => ({
  post: (url: any, body: any) => {
    if (url === "https://oauth2.googleapis.com/token") {
      if (body.code === "123") {
        const id_token = jwt.sign(
          {
            sub: "1234567890",
            name: "testuser",
            email: "test@google.com",
            picture: "thumbnail_url",
            iat: 1516239022,
          },
          "test"
        );
        return Promise.resolve({ data: { id_token } });
      } else {
        const id_token = jwt.sign(
          {
            sub: "1234567891",
            name: "testnewuser",
            email: "test1@google.com",
            picture: "thumbnail_url",
            iat: 1516239022,
          },
          "test"
        );
        return Promise.resolve({ data: { id_token } });
      }
    } else Promise.reject({ response: { statue: 401 } });
  },
}));

jest.mock("../../../services", () => ({
  services: {
    user: {
      login: (provider: any, socialId: any) => {
        if (provider === "google" && socialId === "1234567890")
          return Promise.resolve({
            accessToken: "test_access_token",
            refreshToken: "test_refresh_token",
          });
        else return Promise.resolve(null);
      },
      join: jest.fn(),
    },
  },
}));

describe("google oauth router", () => {
  const server = new Koa();
  server.use(googleRouter.routes());
  const request = supertest(server.callback());

  it("redirect to google login form", async (done) => {
    const response = await request.get("/redirect");
    expect(response.status).toBe(302);
    expect(response.header.location).toStrictEqual(
      expect.stringContaining(`https://accounts.google.com/o/oauth2/v2/auth`)
    );
    done();
  });

  describe("callback", () => {
    it("redirect with tokens if correct code is provided", async (done) => {
      const response = await request.get("/callback?code=123");
      expect(response.status).toBe(302);

      const location = response.header.location;
      expect(location).toEqual(expect.stringMatching(/\/login_callback/));
      expect(location).toEqual(
        expect.stringMatching(/access_token=test_access_token/)
      );
      expect(location).toEqual(
        expect.stringMatching(/refresh_token=test_refresh_token/)
      );
      done();
    });

    it("redirect without tokens if incorrect code is provided", async (done) => {
      const response = await request.get("/callback?code=1234");
      expect(response.status).toBe(302);

      expect(response.header.location).toEqual(
        expect.stringMatching(/\/login_callback$/)
      );
      done();
    });

    it("redirect withtou tokens if user does not exist", async (done) => {
      const response = await request.get("/callback?code=124");
      expect(response.status).toBe(302);

      expect(response.header.location).toEqual(
        expect.stringMatching(/\/login_callback$/)
      );
      done();
    });
  });
});
