import Entity from "../../shared/Entity";

export default class RefreshToken extends Entity {
  readonly createdAt: Date;
  private revokedAt: Date | null;
  private modified: boolean = false;

  constructor(id: number | null, createdAt: Date, revokedAt?: Date) {
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

  public isModified(): boolean {
    return this.modified;
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

  public static generate(): RefreshToken {
    return new RefreshToken(null, new Date());
  }
}
