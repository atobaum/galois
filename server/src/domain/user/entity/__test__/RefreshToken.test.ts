import jwt from "jsonwebtoken";
import { clearScreenDown } from "readline";
import RefreshToken from "../RefreshToken";

describe("RefreshToken", () => {
  const time1 = new Date("2020-08-08");
  const time2 = new Date("2020-08-10");
  const future = new Date("9999-01-01");
  it("새 토큰 만들기", () => {
    const token = RefreshToken.generate();

    expect(token.id).toBeNull();
    expect(token.isRevoked()).toBeFalsy();
    expect(token.isModified()).toBeFalsy();
    expect(token.isNew()).toBeTruthy();
  });

  it("기존 토큰 로딩", () => {
    const token = RefreshToken.create(1, time1);

    expect(token.id).toBe(1);
    expect(token.isRevoked()).toBeFalsy();
    expect(token.isModified()).toBeFalsy();
    expect(token.isNew()).toBeFalsy();
  });

  it("revoked token", () => {
    const token = RefreshToken.create(1, time1, time2);

    expect(token.isRevoked()).toBeTruthy();
    expect(token.isModified()).toBeFalsy();
    expect(token.isNew()).toBeFalsy();
  });

  it("revoking token", () => {
    const token = RefreshToken.create(1, time1);

    token.revoke();
    expect(token.isRevoked()).toBeTruthy();
    expect(token.isModified()).toBeTruthy();
    expect(token.isNew()).toBeFalsy();
  });

  it("generates token", async (done) => {
    const token = RefreshToken.create(1, time1);

    const encodedJwt = await token.generateJWT();
    const decoded = jwt.decode(encodedJwt) as any;

    const sevenDaysInSecs = 7 * 24 * 60 * 60;
    expect(decoded.id).toBe(token.id);
    expect(decoded.iat).toBe(toNumericDate(token.createdAt));
    expect(decoded.exp).toBe(toNumericDate(token.createdAt) + sevenDaysInSecs);
    done();
  });

  it("토큰 생성 오류", () => {
    expect(() => RefreshToken.create(1, future)).toThrow();
    expect(() => RefreshToken.create(1, time2, time1)).toThrow();
    expect(() => RefreshToken.create(1, time1, future)).toThrow();
  });
});

function toNumericDate(date: Date): number {
  return ~~(date.getTime() / 1000);
}
