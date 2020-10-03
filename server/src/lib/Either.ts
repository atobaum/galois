export default class Either<L = any, R = any> {
  isRight: boolean;
  isLeft: boolean;
  private v: L | R;
  private constructor(isRight: boolean, v: L | R) {
    this.isRight = isRight;
    this.isLeft = !isRight;
    this.v = v;

    Object.freeze(this);
  }

  run(ifLeft: (v: L) => any, ifRight: (v: R) => any) {
    if (this.isRight) return ifRight(this.v as R);
    return ifLeft(this.v as L);
  }

  getValue() {
    return this.v;
  }

  getLeft() {
    if (this.isRight) throw new Error("Cannot get right value of Left");
    else return this.v as L;
  }

  getRight() {
    if (this.isLeft) throw new Error("Cannot get left value of Right");
    else return this.v as R;
  }

  map<U = R>(fn: (v: R) => U): Either<L, U> {
    if (this.isLeft) return this as Either<L, any>;
    return Either.right<U>(fn(this.v as R));
  }

  flatMap<U = R>(fn: (v: R) => Either<L, U>): Either<L, U> {
    if (this.isLeft) return this as Either<L, any>;
    return fn(this.v as R);
  }

  static fromNullable<R>(v: R | null | undefined | ""): Either<any, R> {
    if (v) return Either.right(v);
    else return Either.left(v);
  }

  static right<R>(v?: R): Either<any, R> {
    return new Either<any, R>(true, v);
  }

  static left<L>(v?: L): Either<L, any> {
    return new Either<L, any>(false, v);
  }

  static combine(eithers: Either<any, any>[]): Either<any, any> {
    for (let e of eithers) {
      if (e.isLeft) return e;
    }

    return Either.right<any>();
  }
}
