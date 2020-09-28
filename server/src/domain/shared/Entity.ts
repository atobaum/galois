export default abstract class Entity<K = number> {
  readonly id: K | null;

  constructor(id: K | null) {
    this.id = id || null;
  }

  public equals(obj?: Entity<any>): boolean {
    if (!obj) return false;
    if (this === obj) return true;
    if (!(obj instanceof Entity)) return false;

    return this.id !== null || this.id === obj.id;
  }

  public isNew(): boolean {
    return !this.id;
  }
}
