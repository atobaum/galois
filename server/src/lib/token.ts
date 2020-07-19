import jwt, { SignOptions } from "jsonwebtoken";
import { Context } from "koa";

const { JWT_SECRET } = process.env;
if (!JWT_SECRET) throw new Error("Missing JWT_SECRET");

export function generateToken<T>(
  payload: T,
  options: SignOptions
): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(payload as any, JWT_SECRET!, options, (err, encoded) => {
      if (err) reject(err);
      else resolve(encoded);
    });
  });
}

export function decodeToken<T>(token: string): Promise<T> {
  return new Promise((resolve, rejecct) => {
    jwt.verify(token, JWT_SECRET!, (err: any, decoded: any) => {
      if (err) rejecct(err);
      else resolve(decoded as T);
    });
  });
}

export function setTokens(
  ctx: Context,
  tokens: { accessToken: string; refreshToken?: string }
): void {
  // TODO: fix hard coded max age
  ctx.cookies.set("access_token", tokens.accessToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000, //1h
  });

  if (tokens.refreshToken) {
    ctx.cookies.set("refresh_token", tokens.refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, //7d
    });
  }
}

export function clearTokens(ctx: Context) {
  ctx.cookies.set("access_token", "");
  ctx.cookies.set("refresh_token", "");
}

type TokenData = {
  exp: number;
  iat: number;
  sub?: string;
};

export type AccessTokenData = {
  id: number;
} & TokenData;

export type RefreshTokenData = {
  token_id: number;
  email: String;
} & TokenData;
