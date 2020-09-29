import MemoryUserRepository from "../MemoryUserRepository";
import User from "../entity/User";

describe("MemoryUserRepository", () => {
  const repo = new MemoryUserRepository();
  it("findById", async (done) => {
    const user = await repo.findById(1);
    expect(user).toBeTruthy();
    expect(user!.id).toBe(1);
    done();
  });

  it("findBySocialAccount", async (done) => {
    const user = await repo.findBySocialAccount("google", "127");
    expect(user).toBeTruthy();
    expect(user!.id).toBe(2);
    done();
  });

  it("save", async (done) => {
    const user = User.create({
      email: "asdf",
      thumbnail: null,
      username: "adfs",
    });
    const id = await repo.save(user);
    const getUser = await repo.findById(id);

    expect(id).toBeTruthy();
    expect(user.id).toBe(id);
    expect(getUser).toBe(user);
    done();
  });
});
