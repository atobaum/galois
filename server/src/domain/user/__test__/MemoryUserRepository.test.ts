import MemoryUserRepository from "../MemoryUserRepository";
import User from "../entity/User";
import "@src/test/custom-matcher";

describe("MemoryUserRepository", () => {
  const repo = new MemoryUserRepository();
  it("findById", async (done) => {
    const user = await repo.findById(1);
    expect(user).toBeRight();
    expect(user.getRight().id).toBe(1);
    done();
  });

  it("findBySocialAccount", async (done) => {
    const user = await repo.findBySocialAccount("google", "127");
    expect(user).toBeRight();
    expect(user.getRight().id).toBe(2);
    done();
  });

  it("save", async (done) => {
    const user = User.create({
      email: "asdf",
      thumbnail: null,
      username: "adfs",
    });
    const id = await repo.save(user);
    const getUser = await repo.findById(id.getRight());

    expect(id).toBeTruthy();
    expect(getUser.getRight().id).toBe(user.id);
    done();
  });
});
