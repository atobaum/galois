import jwt from "jsonwebtoken";
import User from "../User";

describe("User", () => {
  const userData = {
    username: "testuser",
    email: "email@asf.com",
    thumbnail: "asf;lk",
  };
  // TODO email validation

  // it("setter/getter", () => {});

  // it("add social account", () => {});

  it("cannot generate access token of new user", () => {
    const user = User.create(userData);
    return expect(user.generateAccessToken()).rejects.toThrow();
  });

  it("generate accesstoken", async () => {
    const user = User.create({ ...userData }, 2);
    const token = await user.generateAccessToken();
    const tokenData = jwt.decode(token) as any;

    expect(tokenData).toBeTruthy();
    expect(tokenData.id).toBe(2);
  });

  it("getDTO", () => {
    const user = User.create(userData);
    expect(user.getDTO()).toEqual(userData);
  });
});
