import jwt, { SignOptions } from "jsonwebtoken";
import config from "../config";

export function generateToken<T>(
  payload: T,
  options: SignOptions = {}
): Promise<string> {
  if (!config.jwt.secret) throw new Error("Missing JWT_SECRET");
  return new Promise((resolve, reject) => {
    jwt.sign(payload as any, config.jwt.secret!, options, (err, encoded) => {
      if (err) reject(err);
      else resolve(encoded);
    });
  });
}

export function decodeToken<T>(token: string): Promise<T> {
  if (!config.jwt.secret) throw new Error("Missing JWT_SECRET");
  return new Promise((resolve, rejecct) => {
    jwt.verify(token, config.jwt.secret!, (err: any, decoded: any) => {
      if (err) rejecct(err);
      else resolve(decoded as T);
    });
  });
}
