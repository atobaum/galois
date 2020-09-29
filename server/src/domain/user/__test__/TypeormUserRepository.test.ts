import User from "../entity/User";
import postgrasqlLoader from "../../../loaders/postgresqlLoader";
import { getManager } from "typeorm";
import TypeormUserRepositoy from "../TypeormUserRepository";
import SocialAccount from "../entity/SocialAccount";

const existedUser: any = {
  username: "test1",
  email: "test@test.aom",
  thumbnail: "thumbnail",
  socialAccount: {
    provider: "google",
    socialId: "123",
  },
};

beforeAll(async () => {
  if (!process.env.TYPEORM_DATABASE)
    process.env.TYPEORM_DATABASE = "galois_test";
  await postgrasqlLoader();
  const manager = getManager();
  await manager.query("DELETE FROM social_account;");
  await manager.query("DELETE FROM refresh_token;");
  await manager.query("DELETE FROM user_account;");
  const res = await manager.query(
    `insert into user_account (username, email, thumbnail) values ('${existedUser.username}', '${existedUser.email}', '${existedUser.thumbnail}') returning id;`
  );
  existedUser.id = res[0].id;

  await manager.query(
    `insert into social_account (fk_user_id, provider, social_id) values (${existedUser.id}, 'google', '123');`
  );
});

describe("TypeormUserRepository", () => {
  const repo = new TypeormUserRepositoy();

  it("findById", async (done) => {
    const user = await repo.findById(existedUser.id);
    expect(user).toBeTruthy();
    expect(user!.getDTO()).toMatchObject({
      username: existedUser.username,
      email: existedUser.email,
      thumbnail: existedUser.thumbnail,
    });
    expect(user!.id).toBe(existedUser.id);
    done();
  });

  it("findBySocialAccount", async (done) => {
    const user = await repo.findBySocialAccount(
      existedUser.socialAccount.provider,
      existedUser.socialAccount.socialId
    );
    expect(user).toBeTruthy();
    expect(user!.id).toBe(existedUser.id);
    done();
  });

  it("create an user with social account", async (done) => {
    const socialAccount = new SocialAccount("google", "123");
    const user = User.create({
      email: "asdf",
      thumbnail: null,
      username: "adfs",
      socialAccounts: [socialAccount],
    });
    const id = await repo.save(user);
    const getUser = await repo.findById(id);

    expect(id).toBeTruthy();
    expect(getUser).toBeTruthy();
    expect(getUser!.id).toBe(id);
    expect(getUser!.getDTO()).toMatchObject(user.getDTO());
    done();
  });
});
