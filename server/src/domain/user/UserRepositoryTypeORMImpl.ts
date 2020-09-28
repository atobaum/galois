import { getManager, getRepository } from "typeorm";
import UserORM from "../../typeorm/UserORM";
import IUserRepository from "./IUserRepository";
import User from "./entity/User";
import SocialAccountORM from "../../typeorm/SocialAccountORM";
import SocialAccount from "./entity/SocialAccount";

export default class UserRepositoryTypeORMImpl implements IUserRepository {
  async findById(id: number, option?: any): Promise<User | null> {
    const manager = getManager();
    const user = (await manager.findOne(UserORM, id)) || null;
    return user && this.ormToDomain(user);
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
    return socialAccount.user && this.ormToDomain(socialAccount.user);
  }

  save(entity: User): Promise<number> {
    throw new Error("Method not implemented.");
  }

  delete(id: number): void {
    throw new Error("Method not implemented.");
  }

  private ormToDomain(userData: UserORM): User {
    const socialAccounts = userData.socialAccounts.map(
      (account) => new SocialAccount(account.provider, account.socialId)
    );
    const user: User = User.create(
      { ...userData, socialAccounts },
      userData.id
    );
    return user;
  }
}
