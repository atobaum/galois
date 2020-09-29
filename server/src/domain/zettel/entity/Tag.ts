import IValueObject from "../../shared/IValueObject";

export default class Tag implements IValueObject {
  readonly name: string;
  constructor(name: string) {
    this.name = name;
  }

  equals(obj: Object): boolean {
    if (obj === this) return true;
    if (!(obj instanceof Tag)) return false;
    return this.name === obj.name;
  }
}
