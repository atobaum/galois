import Either from "../../lib/Either";

export default interface IRepository<T, K = number> {
  findById(id: K, option?: any): Promise<Either<any, T>>;
  save(entity: T): Promise<Either<any, K>>;
  delete(id: K): Promise<Either>;
}
