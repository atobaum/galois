import { decodeTokenAsync, generateTokenAsync } from "../token";
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
    expect(generateTokenAsync("asdf")).rejects.toThrow();
    expect(decodeTokenAsync("asdf")).rejects.toThrow();
  });

  it("encodes token", async (done) => {
    const token = await generateTokenAsync({
      a: 1,
      iat: 1601823952,
    });

    expect(token).toBe(jwt);
    done();
  });

  it("decodes token", async (done) => {
    const data = await decodeTokenAsync(jwt);
    expect(data).toMatchObject({ a: 1, iat: 1601823952 });

    done();
  });
});
