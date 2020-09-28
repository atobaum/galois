export default abstract class Entity<K = number> {
  protected _id: K | null;
  protected modified: boolean = false;

  constructor(id: K | null) {
    this._id = id || null;
  }

  public equals(obj?: Entity<any>): boolean {
    if (!obj) return false;
    if (this === obj) return true;
    if (!(obj instanceof Entity)) return false;

    return this._id !== null || this._id === obj._id;
  }

  public isNew(): boolean {
    return !this.id;
  }

  public isModified(): boolean {
    return this.modified;
  }

  public set id(v: K | null) {
    if (v === null) return;
    if (!this._id) this._id = v;
  }

  public get id(): K | null {
    return this._id;
  }
}
