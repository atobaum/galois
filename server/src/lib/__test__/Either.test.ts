import Either from "../Either";

describe("Either monad", () => {
  it("either left or right", () => {
    const e1 = Either.right(1);
    const e2 = Either.left(2);

    expect(e1.isRight && !e1.isLeft).toBe(true);
    expect(!e2.isRight && e2.isLeft).toBe(true);
  });

  it("Left.map returns self", () => {
    const left = Either.left(123);
    const mapped = left.map((a) => "asdf");
    expect(mapped.isLeft).toBe(true);
    expect(mapped).toBe(left);
  });

  it("Left.flatMap return self", () => {
    const left = Either.left(123);
    const mapped = left.flatMap((a) => Either.right("asdf"));
    expect(mapped).toBe(left);
  });

  it("Right.map returns properly", () => {
    const right = Either.right(123);
    const mapped = right.map((a) => a + 1);
    expect(mapped.isRight).toBe(true);
    expect(mapped.getValue()).toBe(124);
  });

  it("Right.flatMap returns properly", () => {
    const right = Either.right(123);
    const mapped = right.flatMap((a) => Either.right(a + 1));
    expect(mapped.isRight).toBe(true);
    expect(mapped.getValue()).toBe(124);
  });

  it("Right.flatMap returns left properly", () => {
    const right = Either.right(123);
    const mapped = right.flatMap((a) => Either.left(a + 1));
    expect(mapped.isLeft).toBe(true);
    expect(mapped.getValue()).toBe(124);
  });

  it("종합 테스트1", () => {
    const right = Either.right(123);
    const mapped = right
      .flatMap((a) => Either.right(a + 1))
      .flatMap((a) => Either.left(a + 1))
      .flatMap((a) => Either.right(a + 1));
    expect(mapped.isLeft).toBe(true);
    expect(mapped.getValue()).toBe(125);
  });

  it("run test 1", () => {
    const right = Either.right(123);
    const result = right
      .flatMap((a) => Either.right(a + 1))
      .flatMap((a) => Either.left(a + 1))
      .flatMap((a) => Either.right(a + 1))
      .run(
        (v) => "l",
        (v) => "r"
      );
    expect(result).toBe("l");
  });

  it("run test 2", () => {
    const right = Either.right(123);
    const result = right
      .flatMap((a) => Either.right(a + 1))
      .run(
        (v) => "l",
        (v) => "r"
      );
    expect(result).toBe("r");
  });

  it("combine returns first left", () => {
    const left1 = Either.left(1);
    const left2 = Either.left(2);
    const right4 = Either.right(4);
    const right5 = Either.right(5);

    const result = Either.combine([right4, left1, right5, left2]);
    expect(result).toBe(left1);
  });

  it("combine returns right if no left", () => {
    const right1 = Either.right(1);
    const right2 = Either.right(2);

    const result = Either.combine([right1, right2]);
    expect(result.isRight).toBe(true);
  });
});
