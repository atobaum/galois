import RefreshToken from "../domain/user/entity/RefreshToken";
import SocialAccount, {
  SocialProvider,
} from "../domain/user/entity/SocialAccount";
import User, { AuthToken } from "../domain/user/entity/User";
import IUserRepository from "../domain/user/IUserRepository";

export default class UserService {
  private userRepo: IUserRepository;
  constructor(userRepository: IUserRepository) {
    this.userRepo = userRepository;
  }

  async join(args: {
    username: string;
    email: string;
    thumbnail?: string;
    socialAccount: { socialId: string; provider: SocialProvider };
  }): Promise<AuthToken | null> {
    const socialAccount = new SocialAccount(
      args.socialAccount.provider,
      args.socialAccount.socialId
    );

    const refreshToken = RefreshToken.generate();

    const user = User.create({
      email: args.email,
      username: args.username,
      thumbnail: args.thumbnail || null,
      socialAccounts: [socialAccount],
      refreshTokens: [refreshToken],
    });
    if (user.isLeft) throw new Error("Fail to create user");

    const id = await this.userRepo.save(user.getRight());
    if (!id) throw new Error("Fail to save user");

    return await this.login(
      args.socialAccount.provider,
      args.socialAccount.socialId
    );
  }

  async login(
    provider: SocialProvider,
    socialId: string
  ): Promise<AuthToken | null> {
    let user = await this.userRepo.findBySocialAccount(provider, socialId);
    const refreshToken = RefreshToken.generate();
    user = user.map((u) => {
      u.addRefreshToken(refreshToken);
      return u;
    });
    if (user.isLeft) return null;

    // const id = await this.userRepo.save(user.getRight());
    // if (id.isLeft) throw new Error("Fail to save user");

    // const refreshJWT = await refreshToken.generateJWT();
    const accessJWT = user.flatMap((user) => user.generateAccessToken());

    if (accessJWT.isLeft) return null;
    return {
      // refreshToken: refreshJWT,
      refreshToken: "123",
      accessToken: accessJWT.getRight(),
    };
  }

  async logout(refreshTokenId: number, userId: number): Promise<void> {
    const user = await this.userRepo.findById(userId, {
      join: ["refreshToken"],
    });

    if (user.isLeft) return; //log
    const refreshToken = user
      .getRight()
      .refreshTokens!.find((t) => t.id === refreshTokenId);
    if (!refreshToken) return;
    refreshToken.revoke();

    await this.userRepo.save(user.getRight());
  }

  async refresh(
    refreshTokenId: number,
    userId: number
  ): Promise<AuthToken | null> {
    let user = await this.userRepo.findById(userId, {
      join: ["refreshToken"],
    });

    if (user.isLeft) return null;
    let refreshToken = user
      .getRight()
      .refreshTokens!.find((t) => t.id === refreshTokenId);
    if (!refreshToken) return null;
    if (refreshToken.getRemaining() < 1 * 60 * 60) {
      //1h
      refreshToken.revoke();
      refreshToken = RefreshToken.generate();
      user.getRight().addRefreshToken(refreshToken);
      const id = await this.userRepo.save(user.getRight());
      if (!id) throw new Error("Fail to save user");
    }

    const refreshJWT = await refreshToken.generateJWT();
    const accessJWT = user
      .flatMap((user) => user.generateAccessToken())
      .getRight();

    return {
      refreshToken: refreshJWT,
      accessToken: accessJWT,
    };
  }
}
