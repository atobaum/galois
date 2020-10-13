import jwt from "jsonwebtoken";
import User from "../User";
import "@src/test/custom-matcher";

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
    expect(user.generateAccessToken()).toBeLeft();
  });

  it("generate accesstoken", async () => {
    const user = User.create({ ...userData }, 2);
    const token = user.generateAccessToken();
    const tokenData = jwt.decode(token.getRight()) as any;

    expect(tokenData).toBeTruthy();
    expect(tokenData.id).toBe(2);
  });

  it("getDTO", () => {
    const user = User.create(userData);
    expect(user.toDTO()).toEqual(userData);
  });
});
