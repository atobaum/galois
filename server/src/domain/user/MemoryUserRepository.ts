import Either from "../../lib/Either";
import SocialAccount from "./entity/SocialAccount";
import User from "./entity/User";
import IUserRepository from "./IUserRepository";

const initUsers: { [key: number]: User } = {
  1: User.create(
    {
      email: "test1@test.com",
      thumbnail: null,
      username: "test1",
      socialAccounts: [new SocialAccount("google", "123")],
    },
    1
  ).getRight(),
  2: User.create(
    {
      email: "test2@test.com",
      thumbnail: "thumb",
      username: "test2",
      socialAccounts: [
        new SocialAccount("facebook", "125"),
        new SocialAccount("google", "127"),
      ],
    },
    2
  ).getRight(),
};

export default class MemoryUserRepository implements IUserRepository {
  db: { [k: number]: User };
  nextId: number;
  constructor() {
    this.db = initUsers;
    this.nextId = 3;
  }

  async findBySocialAccount(provider: string, socialId: string) {
    let user = null;
    for (let id in this.db) {
      if (
        this.db[id].socialAccounts?.some(
          (sa) => sa.provider === provider && sa.socialId === socialId
        )
      )
        user = this.db[id];
    }
    if (user && user.refreshTokens) {
      user.refreshTokens = user.refreshTokens.filter((rt) => !rt.isRevoked());
    }
    return Either.fromNullable(user);
  }

  async findById(id: number, option?: any) {
    const user = this.db[id] || null;
    if (user && user.refreshTokens) {
      user.refreshTokens = user.refreshTokens.filter((rt) => !rt.isRevoked());
    }
    return Either.right(user);
  }
  async save(entity: User) {
    if (!entity.id) {
      entity.id = this.nextId;
      this.nextId++;
    }

    if (entity.refreshTokens) {
      entity.refreshTokens.forEach((rt) => {
        if (rt.isNew()) rt.id = ~~(Math.random() * 1000);
      });
    }
    this.db[entity.id] = entity;
    return Either.right(entity.id);
  }
  async delete(id: number) {
    delete this.db[id];
    return Either.right();
  }
}
