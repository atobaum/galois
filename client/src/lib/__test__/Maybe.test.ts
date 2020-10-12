import { Maybe } from "../Maybe";

describe("Maybe", () => {
  it("creates just", () => {
    const just1 = new Maybe(null);
    const just2 = new Maybe(123);

    expect(just1.isJust).toBe(true);
    expect(just1.getJust()).toBe(null);
    expect(just2.isJust).toBe(true);
    expect(just2.getJust()).toBe(123);
  });

  it("creates nothing", () => {
    const nothing = new Maybe();

    expect(nothing.isNothing).toBe(true);

    expect(() => nothing.getJust()).toThrow();
    expect(nothing.getValue()).toBe(undefined);
  });

  it("map just", () => {
    const just = new Maybe(123).map((a) => a + 1);
    expect(just.isJust).toBe(true);
    expect(just.getJust()).toBe(124);
  });

  it("map nothing", () => {
    const just = new Maybe<any>().map((a) => a + 1);
    expect(just.isJust).toBe(false);
  });

  it("flatmap just", () => {
    const just1 = new Maybe(123).flatmap((a) => new Maybe(a + 1));
    expect(just1.isJust).toBe(true);
    expect(just1.getJust()).toBe(124);

    const just2 = new Maybe(123).flatmap((a) => new Maybe());
    expect(just2.isJust).toBe(false);
  });

  it("flatmap nothing", () => {
    const nothing = new Maybe<any>().flatmap((a) => a + 1);
    expect(nothing.isNothing).toBe(true);
  });

  it("종합 테스트", () => {
    const just = new Maybe(1)
      .map((a) => a + 1)
      .flatmap((a) => new Maybe(a + 1))
      .map((a) => a + 1);

    expect(just.isJust).toBe(true);
    expect(just.getJust()).toBe(4);
  });
});
