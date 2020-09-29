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
    const id = await this.userRepo.save(user);
    if (!id) throw new Error("Fail to save user");

    const refreshJWT = await refreshToken.generateJWT();
    const accessJWT = await user.generateAccessToken();

    return {
      refreshToken: refreshJWT,
      accessToken: accessJWT,
    };
  }

  async login(
    provider: SocialProvider,
    socialId: string
  ): Promise<AuthToken | null> {
    const user = await this.userRepo.findBySocialAccount(provider, socialId);
    if (!user) return null;

    const refreshToken = RefreshToken.generate();
    user.addRefreshToken(refreshToken);
    const id = await this.userRepo.save(user);
    if (!id) throw new Error("Fail to save user");

    const refreshJWT = await refreshToken.generateJWT();
    const accessJWT = await user.generateAccessToken();

    return {
      refreshToken: refreshJWT,
      accessToken: accessJWT,
    };
  }

  async logout(refreshTokenId: number, userId: number): Promise<void> {
    const user = await this.userRepo.findById(userId, {
      join: ["refreshToken"],
    });

    if (!user) return; //log
    const refreshToken = user.refreshTokens!.find(
      (t) => t.id === refreshTokenId
    );
    if (!refreshToken) return;
    refreshToken.revoke();

    await this.userRepo.save(user);
  }

  async refresh(
    refreshTokenId: number,
    userId: number
  ): Promise<AuthToken | null> {
    const user = await this.userRepo.findById(userId, {
      join: ["refreshToken"],
    });

    if (!user) return null;
    let refreshToken = user.refreshTokens!.find((t) => t.id === refreshTokenId);
    if (!refreshToken) return null;
    if (refreshToken.getRemaining() < 1 * 60 * 60) {
      //1h
      refreshToken.revoke();
      refreshToken = RefreshToken.generate();
      user.addRefreshToken(refreshToken);
      const id = await this.userRepo.save(user);
      if (!id) throw new Error("Fail to save user");
    }

    const refreshJWT = await refreshToken.generateJWT();
    const accessJWT = await user.generateAccessToken();

    return {
      refreshToken: refreshJWT,
      accessToken: accessJWT,
    };
  }
}
