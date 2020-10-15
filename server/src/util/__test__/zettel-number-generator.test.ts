import zettelNumberGenerator, { formatDate } from "../zettel-number-generator";

describe("zettel-number-generator", () => {
  const today = new Date();
  const todayNum = formatDate(today);
  it("formats date to number", () => {
    const result = formatDate(new Date("2020-05-04T11:00:00Z"));

    expect(result).toBe(200504);
  });

  it("generates yymmdd001 if prevDate is not provided", () => {
    const num = zettelNumberGenerator();

    expect(num).toBe(todayNum * 1000 + 1);
  });

  it("generates yymmdd001 if prevDate is not today", () => {
    const num = zettelNumberGenerator(200707002);

    expect(num).toBe(todayNum * 1000 + 1);
  });

  it("generates prevNumber+1 if prevDate is today", () => {
    const num = zettelNumberGenerator(todayNum * 1000 + 12);

    expect(num).toBe(todayNum * 1000 + 13);
  });

  it("throws error if prevNumber is max", () => {
    expect(() => zettelNumberGenerator(todayNum * 1000 + 999)).toThrow();
  });

  it("throws error if length prevNumber is longer than 9", () => {
    expect(() => zettelNumberGenerator(20201111001)).toThrow();
  });
});
