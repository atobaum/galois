export default interface IRepository<T, K = number> {
  findById(id: K, option?: any): Promise<T | null>;
  save(entity: T): Promise<K>;
  delete(id: K): void;
}
