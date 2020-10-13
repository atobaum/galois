import Entity from "../../shared/Entity";
import { generateTokenAsync } from "../../../lib/token";

const lifetime = 7 * 24 * 60 * 60; //7d
export default class RefreshToken extends Entity {
  readonly createdAt: Date;
  private revokedAt: Date | null;

  constructor(id: number | undefined, createdAt: Date, revokedAt?: Date) {
    super(id);
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

  public static create(
    id: number,
    createdAt: Date,
    revokedAt?: Date
  ): RefreshToken {
    const now = new Date();
    if (
      now < createdAt ||
      (revokedAt && (now < revokedAt || revokedAt < createdAt))
    )
      throw new Error("error: RefreshToken.create: Invalid date");
    return new RefreshToken(id, createdAt, revokedAt);
  }

  public generateJWT(): Promise<string> {
    if (!this.id) throw new Error("Cannot generate refresh token jwt");
    return generateTokenAsync(
      {
        id: this.id,
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

  public static generate(): RefreshToken {
    return new RefreshToken(undefined, new Date());
  }
}

function toNumericDate(date: Date): number {
  return ~~(date.getTime() / 1000);
}
