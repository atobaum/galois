import axios from "axios";
import Koa from "koa";
import supertest from "supertest";
import googleRouter from "./google";

// jest.mock("axios", () => ({
//   post: (url, body) => {
//     if (body.code === "123")
//       return Promise.resolve({ data: { id_token: "asfd" } });
//   },
// }));

// jest.mock("../../../services", ()=>({
//     user: {
//         login: (provider, socialId)=>{
//             if(provider === "google" && socialId === "5")
//         },
//         join: jest.fn()
//     }
// }))

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

  // it("get access token using code", async (done) => {
  //   const response = await request.get("/callback?code=123");
  //   expect(axios.post).toBeCalledWith();
  // });
});
