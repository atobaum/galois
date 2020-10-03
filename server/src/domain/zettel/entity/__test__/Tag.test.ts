import Tag from "../Tag";

describe("<VO>Tag", () => {
  it("equals", () => {
    const t1 = new Tag("t1");
    const t2 = new Tag("t1");
    const t3 = new Tag("t3");

    expect(t1.equals(t2)).toBe(true);
    expect(t1.equals(t3)).toBe(false);
    expect(t1.equals(new Object())).toBe(false);
  });
});
