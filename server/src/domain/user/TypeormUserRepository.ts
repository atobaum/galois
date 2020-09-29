import { getManager, getRepository } from "typeorm";
import UserORM from "../../typeorm/UserORM";
import IUserRepository from "./IUserRepository";
import User from "./entity/User";
import SocialAccountORM from "../../typeorm/SocialAccountORM";
import SocialAccount from "./entity/SocialAccount";
import RefreshTokenORM from "../../typeorm/RefreshTokenORM";
import { userResolvers } from "../../graphql/userSchema";

export default class TypeormUserRepositoy implements IUserRepository {
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

  async save(user: User): Promise<number> {
    const manager = getManager();
    if (user.isNew()) {
      const userOrm = new UserORM();
      const userDTO = user.getDTO();
      userOrm.email = userDTO.email;
      userOrm.thumbnail = userDTO.thumbnail || null;
      userOrm.username = userDTO.username;

      userOrm.socialAccounts = [];
      if (user.socialAccounts) {
        user.socialAccounts.forEach((sa) => {
          const socialAccountOrm = new SocialAccountORM(
            sa.provider,
            sa.socialId
          );
          socialAccountOrm.user = userOrm;
          userOrm.socialAccounts.push(socialAccountOrm);
        });
      }

      let refreshTokensOrm: RefreshTokenORM[];
      if (user.refreshTokens) {
        refreshTokensOrm = user.refreshTokens.map((rt) => {
          const rtorm = new RefreshTokenORM();
          rtorm.createdAt = rt.createdAt;
          rtorm.user = userOrm;
          return rtorm;
        });
      }

      await manager.transaction(async (m) => {
        await m.save(userOrm);
        await Promise.all(userOrm.socialAccounts.map((sa) => m.save(sa)));
        if (refreshTokensOrm)
          await Promise.all(refreshTokensOrm.map((rt) => m.save(rt)));
      });
      return userOrm.id!;
    } else {
      // TODO UPDATE
      throw new Error("Not implemented: TypeOrmUserRepository.save");
      const userOrm = new UserORM(user.id!);
      const userDTO = user.getDTO();
      userOrm.email = userDTO.email;
      userOrm.thumbnail = userDTO.thumbnail || null;
      userOrm.username = userDTO.username;

      await manager.save(userOrm);
    }
  }

  delete(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }

  private ormToDomain(userData: UserORM): User {
    const socialAccounts = userData.socialAccounts?.map(
      (account) => new SocialAccount(account.provider, account.socialId)
    );
    const user: User = User.create(
      { ...userData, socialAccounts },
      userData.id
    );
    return user;
  }
}
