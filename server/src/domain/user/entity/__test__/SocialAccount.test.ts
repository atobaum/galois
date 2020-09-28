import SocialAccount from "../SocialAccount";

describe("<<ValueObject>>SocialAccount", () => {
  it("만들기", () => {
    const sa = new SocialAccount("google", "123123");
  });

  it("동일성 검사", () => {
    const sa1 = new SocialAccount("google", "123123");
    const sa2 = new SocialAccount("google", "123123");
    expect(sa1.equals(sa2)).toBeTruthy();
  });

  it("동일성 검사2", () => {
    const sa1 = new SocialAccount("google", "123123");
    const sa2 = new SocialAccount("google", "123124");
    const sa3 = new SocialAccount("googl", "123123");

    expect(sa1.equals(sa2)).toBeFalsy();
    expect(sa1.equals(sa3)).toBeFalsy();
  });
});
