import Either from "../../lib/Either";
import RefreshToken from "./entity/RefreshToken";
import IRefreshTokenRepository from "./IRefreshTokenRepository";

export default class MemoryRefreshTokenRepository
  implements IRefreshTokenRepository {
  refreshTokens: any[] = [];
  findById(id: number, option?: any): Promise<Either<any, RefreshToken>> {
    const token = this.refreshTokens[id - 1];
    return Promise.resolve(Either.fromNullable(token));
  }
  async save(token: RefreshToken): Promise<Either<any, number>> {
    if (!token.isNew()) return Either.right(token.id!);
    token.id = this.refreshTokens.length + 1;
    this.refreshTokens.push(token);
    return Either.right(token.id);
  }
  delete(id: number): Promise<Either<any, any>> {
    throw new Error("Method not implemented.");
  }
}
