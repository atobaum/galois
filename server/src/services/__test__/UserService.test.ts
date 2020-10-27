import jwt from "jsonwebtoken";
import SocialAccount, {
  SocialProvider,
} from "../../domain/user/entity/SocialAccount";
import User from "../../domain/user/entity/User";
import IUserRepository from "../../domain/user/IUserRepository";
import MemoryUserRepository from "../../domain/user/MemoryUserRepository";
import UserService from "../UserService";
import IRefreshTokenRepository from "src/domain/refreshtoken/IRefreshTokenRepository";
import RefreshToken from "../../domain/refreshtoken/entity/RefreshToken";
import Either from "../../lib/Either";
import "@src/test/custom-matcher";

let repo: IUserRepository;
let userService: UserService;
let oldUser: User;
let newUserInfo = {
  email: "test1@test.com",
  username: "test1",
  socialAccount: { provider: "facebook" as SocialProvider, socialId: "9898" },
};
class mockedRefreshTokenRepo implements IRefreshTokenRepository {
  refreshTokens: any[] = [];
  findById(id: number, option?: any): Promise<Either<any, RefreshToken>> {
    const token = this.refreshTokens[id - 1];
    return Promise.resolve(Either.fromNullable(token));
  }
  async save(token: RefreshToken): Promise<Either<any, number>> {
    if (!token.isNew()) return Either.right(token.id!);
    token.id = this.refreshTokens.length + 1;
    this.refreshTokens.push(token);
    return Either.right(token.id);
  }
  delete(id: number): Promise<Either<any, any>> {
    throw new Error("Method not implemented.");
  }
}

beforeEach(async (done) => {
  repo = new MemoryUserRepository();
  userService = new UserService(repo, new mockedRefreshTokenRepo());

  oldUser = User.create({
    email: "test1@test.com",
    thumbnail: null,
    username: "test1",
    socialAccounts: [new SocialAccount("google", "128")],
  }).getRight();

  await repo.save(oldUser);
  done();
});

describe("UserService", () => {
  describe("join", () => {
    it("가입 가능", async (done) => {
      const tokens = await userService.join(newUserInfo);
      expect(tokens).toBeTruthy();
      expect(tokens!.refreshToken).toBeTruthy();
      expect(tokens!.accessToken).toBeTruthy();

      const accessTokenData = jwt.decode(tokens!.accessToken) as any;
      const id = accessTokenData.id;

      const user = await repo.findById(id);
      expect(user.getRight().toDTO()).toEqual(
        expect.objectContaining({
          username: newUserInfo.username,
          email: newUserInfo.email,
        })
      );
      console.log(tokens);

      done();
    });

    // TODO validation
    // it("가입 실패")
  });

  describe("login", () => {
    it("가능", async (done) => {
      const tokens = await userService.login("google", "128");
      expect(tokens).toBeTruthy();
      expect(tokens!.refreshToken).toBeTruthy();
      expect(tokens!.accessToken).toBeTruthy();
      done();
    });

    it("실패", async (done) => {
      const tokens = await userService.login("google", "120");
      expect(tokens).toBeFalsy();
      done();
    });
  });

  // describe("refresh", () => {
  //   it("성공", async (done) => {
  //     const tokens = await userService.login("google", "128");
  //     expect(tokens).toBeTruthy();
  //     const accessTokenData = jwt.decode(tokens!.accessToken) as any;
  //     const refreshTokenData = jwt.decode(tokens!.refreshToken) as any;

  //     await new Promise((res) => setTimeout(res, 2000));

  //     const newTokens = await userService.refresh(
  //       refreshTokenData.id,
  //       accessTokenData.id
  //     );
  //     expect(newTokens).toBeTruthy();
  //     expect(newTokens!.refreshToken).toBe(tokens!.refreshToken);
  //     expect(newTokens!.accessToken).not.toBe(tokens!.accessToken);
  //     done();
  //   });

  //   it("실패", async (done) => {
  //     const tokens = await userService.login("google", "128");
  //     expect(tokens).toBeTruthy();
  //     const accessTokenData = jwt.decode(tokens!.accessToken) as any;

  //     const newTokens = await userService.refresh(7098, accessTokenData.id);
  //     expect(newTokens).toBeNull();
  //     done();
  //   });
  // });

  // describe("logout", () => {
  //   it("성공", async (done) => {
  //     const tokens = await userService.login("google", "128");

  //     expect(tokens).toBeTruthy();
  //     const accessTokenData = jwt.decode(tokens!.accessToken) as any;
  //     const refreshTokenData = jwt.decode(tokens!.refreshToken) as any;
  //     const userId = accessTokenData.id;
  //     const refreshTokenId = refreshTokenData.id;

  //     let user = await repo.findById(userId);
  //     expect(user).toBeRight();
  //     const retrievedRefreshToken = user
  //       .getRight()
  //       .refreshTokens?.find((rt) => rt.id === refreshTokenId);

  //     expect(retrievedRefreshToken).toBeTruthy();
  //     expect(retrievedRefreshToken!.isRevoked()).toBe(false);

  //     await userService.logout(refreshTokenId, userId);

  //     user = await repo.findById(userId);
  //     const revokedRefreshToken = user
  //       .getRight()
  //       .refreshTokens?.find((rt) => rt.id === refreshTokenId);
  //     expect(revokedRefreshToken).toBeUndefined();
  //     done();
  //   });
  // });
});
