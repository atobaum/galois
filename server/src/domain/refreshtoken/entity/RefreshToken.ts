import { generateToken } from "../../../lib/token";
import AggregateRoot from "../../../domain/shared/AggregateRoot";
import Either from "../../../lib/Either";

const lifetime = 7 * 24 * 60 * 60; //7d

export default class RefreshToken extends AggregateRoot<any> {
  private userId: number;
  readonly createdAt: Date;
  private revokedAt: Date | null;

  constructor(
    id: number | undefined,
    userId: number,
    createdAt: Date,
    revokedAt?: Date
  ) {
    super(id);
    this.userId = userId;
    this.createdAt = createdAt;
    this.revokedAt = revokedAt || null;
  }

  public isRevoked(): boolean {
    return !!this.revokedAt;
  }

  public revoke(): void {
    if (this.isRevoked()) return;
    this.revokedAt = new Date();
    this.modified = true;
  }

  public validateUser(userId: number): Either<any, RefreshToken> {
    return this.userId === userId
      ? Either.left("INVALID_USER")
      : Either.right(this);
  }

  public static create(
    id: number,
    userId: number,
    createdAt: Date,
    revokedAt?: Date
  ): RefreshToken {
    const now = new Date();
    if (
      now < createdAt ||
      (revokedAt && (now < revokedAt || revokedAt < createdAt))
    )
      throw new Error("error: RefreshToken.create: Invalid date");
    return new RefreshToken(id, userId, createdAt, revokedAt);
  }

  public generateJWT(): Either<any, string> {
    if (!this.id) throw new Error("Cannot generate refresh token jwt");
    return generateToken(
      {
        id: this.id,
        userId: this.userId,
        iat: toNumericDate(this.createdAt),
        exp: toNumericDate(this.createdAt) + lifetime,
      },
      {
        subject: "refresh_token",
      }
    );
  }

  //returns remaining life in seconds
  public getRemaining(): number {
    if (this.revokedAt) return 0;
    return (
      lifetime - (toNumericDate(new Date()) - toNumericDate(this.createdAt))
    );
  }

  public static generate(userId: number): RefreshToken {
    return new RefreshToken(undefined, userId, new Date());
  }
}

function toNumericDate(date: Date): number {
  return ~~(date.getTime() / 1000);
}
