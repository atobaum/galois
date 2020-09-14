import { getManager, getRepository } from "typeorm";
import UserDAO from "../entity/UserDAO";
import SocialAccountDAO from "../entity/SocialAccountDAO";

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
    social?: { provider: string; socialId: string };
    thumbnail?: string;
    email: string;
  }): Promise<User>;

  delete(user: User): Promise<boolean>;
}

export default class UserRepositoryPostgres implements UserRepository {
  async findById(id: number): Promise<UserDAO | null> {
    const manager = getManager();
    const user = (await manager.findOne(UserDAO, id)) || null;
    return user;
  }

  async findBySocialAccount(
    provider: string,
    socialId: string
  ): Promise<User | null> {
    const repo = getRepository(SocialAccountDAO);
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

    const user = new UserDAO();
    user.username = args.username;
    user.email = args.email;
    user.thumbnail = args.thumbnail;

    const socialAccount = new SocialAccountDAO();
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
