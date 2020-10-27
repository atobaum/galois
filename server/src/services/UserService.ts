import IRefreshTokenRepository from "src/domain/refreshtoken/IRefreshTokenRepository";
import Either from "../lib/Either";
import { decodeToken } from "../lib/token";
import RefreshToken from "../domain/refreshtoken/entity/RefreshToken";
import SocialAccount, {
  SocialProvider,
} from "../domain/user/entity/SocialAccount";
import User, { AuthToken } from "../domain/user/entity/User";
import IUserRepository from "../domain/user/IUserRepository";

export default class UserService {
  private userRepo: IUserRepository;
  private refreshTokenRepo: IRefreshTokenRepository;
  constructor(
    userRepository: IUserRepository,
    refreshTokenRepo?: IRefreshTokenRepository
  ) {
    this.userRepo = userRepository;
    this.refreshTokenRepo = refreshTokenRepo as IRefreshTokenRepository;
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

    const user = User.create({
      email: args.email,
      username: args.username,
      thumbnail: args.thumbnail || null,
      socialAccounts: [socialAccount],
    });
    if (user.isLeft) throw new Error("Fail to create user");

    const id = await this.userRepo.save(user.getRight());
    if (id.isLeft) throw new Error("Fail to save user");

    return await this.login(
      args.socialAccount.provider,
      args.socialAccount.socialId
    );
  }

  async login(
    provider: SocialProvider,
    socialId: string
  ): Promise<AuthToken | null> {
    let userOrFail = await this.userRepo.findBySocialAccount(
      provider,
      socialId
    );
    if (userOrFail.isLeft) return null;

    const user = userOrFail.getRight();
    const refreshToken = RefreshToken.generate(user.id!);
    const refreshTokenIdOrFail = await this.refreshTokenRepo.save(refreshToken);

    if (refreshTokenIdOrFail.isLeft) return null;
    const refreshTokenOrFail = await this.refreshTokenRepo.findById(
      refreshTokenIdOrFail.getRight()
    );

    const refreshJWT = refreshTokenOrFail.flatMap((token) =>
      token.generateJWT()
    );
    const accessJWT = userOrFail.flatMap((user) => user.generateAccessToken());

    if (accessJWT.isLeft || refreshJWT.isLeft) return null;
    return {
      refreshToken: refreshJWT.getRight(),
      accessToken: accessJWT.getRight(),
    };
  }

  async logout(refreshTokenId: number, userId: number): Promise<void> {
    throw new Error("Not implemented");
  }

  async refresh(
    refreshTokenJWT: string,
    userId: number
  ): Promise<AuthToken | null> {
    const refreshTokenData = decodeToken<{ id: number; userId: number }>(
      refreshTokenJWT,
      { subject: "refresh_token" }
    ).flatMap((data) =>
      data.userId === userId
        ? Either.right(data)
        : Either.left(new Error("INVALID_USER"))
    );
    if (refreshTokenData.isLeft) return null;

    const refreshToken = await this.refreshTokenRepo.findById(
      refreshTokenData.getRight().id
    );

    const user = await this.userRepo.findById(userId);

    const refreshJWT = refreshToken
      .flatMap((token) => token.validateUser(userId))
      .flatMap((token) => token.generateJWT());
    const accessJWT = user.flatMap((user) => user.generateAccessToken());

    if (accessJWT.isLeft || refreshJWT.isLeft) return null;
    return {
      refreshToken: refreshJWT.getRight(),
      accessToken: accessJWT.getRight(),
    };
  }
}
