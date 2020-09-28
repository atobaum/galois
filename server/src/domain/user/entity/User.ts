import { generateToken } from "../../../lib/token";
import AggregateRoot from "../../shared/AggregateRoot";
import RefreshToken from "./RefreshToken";
import SocialAccount from "./SocialAccount";

type UserProps = {
  username: string;
  email: string;
  thumbnail: string | null;

  socialAccounts?: SocialAccount[];
  refreshTokens?: RefreshToken[];
};

export type AuthToken = {
  refreshToken: string;
  accessToken: string;
};

export default class User extends AggregateRoot {
  private username: string;
  private email: string;
  private thumbnail: string | null;

  socialAccounts: SocialAccount[] | null;
  refreshTokens: RefreshToken[] | null;

  private constructor(props: UserProps, id?: number) {
    super(id || null);
    this.username = props.username;
    this.email = props.email;
    this.thumbnail = props.thumbnail;

    this.socialAccounts = props.socialAccounts || null;
    this.refreshTokens = props.refreshTokens || null;
  }

  public setUsername(newUsername: string): void {
    this.username = newUsername;
  }

  public setEmail(newEmail: string): void {
    this.email = newEmail;
  }

  public setThumbnail(newThumb: string): void {
    this.thumbnail = newThumb;
  }

  public addSocialAccount(social: SocialAccount) {
    if (!this.socialAccounts) this.socialAccounts = [];
    this.socialAccounts.push(social);
  }

  public addRefreshToken(token: RefreshToken) {
    if (!this.refreshTokens) this.refreshTokens = [];
    this.refreshTokens.push(token);
  }

  public generateAccessToken(): Promise<string> {
    return generateToken(
      { id: this.id },
      { expiresIn: "1h", subject: "access_token" }
    );
  }

  public getDTO() {
    return {
      username: this.username,
      email: this.email,
      thumbnail: this.thumbnail,
    };
  }

  static create(props: UserProps, id: number): User {
    // props validation with joi

    const user = new User(props, id);
    throw new Error("asdf");
  }
}