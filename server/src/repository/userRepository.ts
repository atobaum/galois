import { getManager, getRepository } from "typeorm";
import UserORM from "../entity/UserORM";
import SocialAccountORM from "../entity/SocialAccountORM";

export interface User {
  readonly id: number;
  username: string;
  email: string;
  thumbnail?: string;
}

export interface UserRepository {
  findById(id: number): Promise<User | null>;
  findBySocialAccount(provider: string, socialId: string): Promise<User | null>;
  create(args: {
    username: string;
    socialAccount?: { provider: string; socialId: string };
    thumbnail?: string;
    email: string;
  }): Promise<User>;

  delete(user: User): Promise<boolean>;
}

export default class UserRepositoryPostgres implements UserRepository {
  async findById(id: number): Promise<UserORM | null> {
    const manager = getManager();
    const user = (await manager.findOne(UserORM, id)) || null;
    return user;
  }

  async findBySocialAccount(
    provider: string,
    socialId: string
  ): Promise<User | null> {
    const repo = getRepository(SocialAccountORM);
    const socialAccount =
      (await repo.findOne({
        relations: ["user"],
        where: {
          provider,
          socialId,
        },
      })) || null;
    if (!socialAccount) return null;
    return socialAccount.user;
  }

  async create(args: {
    username: string;
    email: string;
    thumbnail?: string;
    socialAccount: { socialId: string; provider: string };
  }): Promise<User> {
    const manager = getManager();

    const user = new UserORM();
    user.username = args.username;
    user.email = args.email;
    user.thumbnail = args.thumbnail;

    const socialAccount = new SocialAccountORM();
    socialAccount.user = user;
    socialAccount.socialId = args.socialAccount.socialId;
    socialAccount.provider = args.socialAccount.provider;

    await manager.save(user);
    await manager.save(socialAccount);

    return user;
  }

  delete(user: User): Promise<boolean> {
    throw new Error("Not implemented");
  }
}
