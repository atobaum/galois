import Either from "src/lib/Either";
import RefreshToken from "./entity/RefreshToken";
import IRefreshTokenRepository from "./IRefreshTokenRepository";

export default class TypeormRefreshTokenRepository implements IRefreshTokenRepository{
    findById(id: number, option?: any): Promise<Either<any, RefreshToken>> {
        throw new Error("Method not implemented.");
    }
    save(entity: RefreshToken): Promise<Either<any, number>> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<Either<any, any>> {
        throw new Error("Method not implemented.");
    }
}