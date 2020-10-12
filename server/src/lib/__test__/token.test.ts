import { decodeToken, generateToken } from "../token";
import config from "../../config";

const jwt =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhIjoxLCJpYXQiOjE2MDE4MjM5NTJ9.Kv_RVa2RZghnuatLcfbEEU1kTaDcWZN3ig7BwMZuNNs";

jest.mock("../../config", () => {
  return {
    jwt: { secret: "test" },
  };
});

describe("token", () => {
  beforeEach(() => {
    config.jwt.secret = "test";
    jest.resetModules();
  });

  it("checks jwt secret", () => {
    config.jwt.secret = "";
    jest.resetModules();
    expect(() => generateToken("asdf")).toThrow();
    expect(() => decodeToken("asdf")).toThrow();
  });

  it("encodes token", async (done) => {
    const token = await generateToken({
      a: 1,
      iat: 1601823952,
    });

    expect(token).toBe(jwt);
    done();
  });

  it("decodes token", async (done) => {
    const data = await decodeToken(jwt);
    expect(data).toMatchObject({ a: 1, iat: 1601823952 });

    done();
  });
});
