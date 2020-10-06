//Maybe monad

export class Maybe<T> {
  private value?: T;
  isNothing: boolean;
  isJust: boolean;

  constructor(value?: T) {
    this.value = value;
    this.isNothing = value === undefined;
    this.isJust = !this.isNothing;

    Object.freeze(this);
  }

  public getJust(): T {
    if (this.isJust) return this.value!;
    throw new Error("Cannot get value from Nothing");
  }

  public getValue(): T | undefined {
    return this.value;
  }

  public map<U>(fn: (v: T) => U): Maybe<U> {
    if (this.isJust) return new Maybe(fn(this.value!));
    else return this as any;
  }

  public flatmap<U>(fn: (v: T) => Maybe<U>): Maybe<U> {
    const tmp = this.map(fn);
    if (tmp.isNothing) return tmp as any;
    return tmp.getJust();
  }
}
