import jwt, { SignOptions } from "jsonwebtoken";
import config from "../config";

const JWT_SECRET = config.jwt.secret;

export function generateToken<T>(
  payload: T,
  options: SignOptions = {}
): Promise<string> {
  if (!JWT_SECRET) throw new Error("Missing JWT_SECRET");
  return new Promise((resolve, reject) => {
    jwt.sign(payload as any, JWT_SECRET!, options, (err, encoded) => {
      if (err) reject(err);
      else resolve(encoded);
    });
  });
}

export function decodeToken<T>(token: string): Promise<T> {
  if (!JWT_SECRET) throw new Error("Missing JWT_SECRET");
  return new Promise((resolve, rejecct) => {
    jwt.verify(token, JWT_SECRET!, (err: any, decoded: any) => {
      if (err) rejecct(err);
      else resolve(decoded as T);
    });
  });
}
