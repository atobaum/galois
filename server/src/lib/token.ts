import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";
import config from "../config";
import Either from "./Either";

//deprecated
export async function generateTokenAsync<T>(
  payload: T,
  options: SignOptions = {}
): Promise<string> {
  const tokenOrFail = generateToken(payload, options);
  if (tokenOrFail.isRight) return tokenOrFail.getRight();
  throw tokenOrFail.getLeft();
}

//deprecated
export async function decodeTokenAsync<T>(
  token: string,
  options: VerifyOptions = {}
): Promise<T> {
  const dataOrFail = decodeToken<T>(token, options);
  if (dataOrFail.isRight) return dataOrFail.getRight();
  throw dataOrFail.getLeft();
}

export function generateToken<T>(
  payload: T,
  options: SignOptions = {}
): Either<Error, string> {
  try {
    if (!config.jwt.secret) throw new Error("Missing JWT_SECRET");
    const token = jwt.sign(payload as any, config.jwt.secret!, options);
    return Either.right(token);
  } catch (e) {
    return Either.left(e);
  }
}

export function decodeToken<T>(
  token: string,
  options: VerifyOptions = {}
): Either<Error, T> {
  try {
    if (!config.jwt.secret) throw new Error("Missing JWT_SECRET");
    const data: T = jwt.verify(token, config.jwt.secret!, options) as any;
    return Either.right(data);
  } catch (e) {
    return Either.left(e);
  }
}
