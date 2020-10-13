import User from "../entity/User";
import TypeormUserRepositoy from "../TypeormUserRepository";
import SocialAccount from "../entity/SocialAccount";
import initState from "../../../test/initState";
import postgrasqlLoader from "../../../loaders/postgresqlLoader";
import "@src/test/custom-matcher";

const existedUser = initState.user;

beforeAll(async () => {
  await postgrasqlLoader();
});

describe("TypeormUserRepository", () => {
  const repo = new TypeormUserRepositoy();

  it("findById", async (done) => {
    const user = await repo.findById(existedUser.id);
    expect(user).toBeRight();
    expect(user.getRight().toDTO()).toMatchObject({
      username: existedUser.username,
      email: existedUser.email,
      thumbnail: existedUser.thumbnail,
    });
    expect(user.getRight().id).toBe(existedUser.id);
    done();
  });

  it("findBySocialAccount", async (done) => {
    const user = await repo.findBySocialAccount(
      existedUser.socialAccount.provider,
      existedUser.socialAccount.socialId
    );
    expect(user).toBeRight();
    expect(user.getRight().id).toBe(existedUser.id);
    done();
  });

  it("create an user with social account", async (done) => {
    const socialAccount = new SocialAccount("google", "123");
    const user = User.create({
      email: "qwe@test.com",
      thumbnail: null,
      username: "qweqwe",
      socialAccounts: [socialAccount],
    });
    const id = await repo.save(user);
    const getUser = await repo.findById(id.getRight());

    expect(id).toBeTruthy();
    expect(getUser).toBeRight();
    expect(getUser.getRight().id).toBe(id.getRight());
    expect(getUser.getRight().toDTO()).toMatchObject(user.toDTO());
    done();
  });
});
