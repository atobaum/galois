import Either from "../../lib/Either";
import RefreshTokenORM from "../../typeorm/RefreshTokenORM";
import { getRepository } from "typeorm";
import RefreshToken from "./entity/RefreshToken";
import IRefreshTokenRepository from "./IRefreshTokenRepository";

export default class TypeormRefreshTokenRepository
  implements IRefreshTokenRepository {
  async findById(id: number, option?: any): Promise<Either<any, RefreshToken>> {
    const repo = getRepository(RefreshTokenORM);
    return Either.fromNullable(await repo.findOne(id)).map(this.mapToEntity);
  }
  async save(token: RefreshToken): Promise<Either<any, number>> {
    const repo = getRepository(RefreshTokenORM);
    try {
      if (token.isNew()) {
        const dto = token.toDTO();
        const tokenOrm = new RefreshTokenORM();
        tokenOrm.fk_user_id = dto.userId;
        tokenOrm.createdAt = dto.createdAt;
        await repo.save(tokenOrm);
        return Either.right(tokenOrm.id);
      } else {
        if (token.isModified() && token.isRevoked())
          await repo.update(token.id!, {
            revokedAt: token.toDTO().revokedAt!,
          });
        return Either.right(token.id);
      }
    } catch (e) {
      return Either.left(e);
    }
  }
  delete(id: number): Promise<Either<any, any>> {
    throw new Error("Method not implemented.");
  }

  private mapToEntity(orm: RefreshTokenORM): RefreshToken {
    return RefreshToken.create(
      orm.id,
      orm.fk_user_id,
      orm.createdAt,
      orm.revokedAt
    );
  }
}
