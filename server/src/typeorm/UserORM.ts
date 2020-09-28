import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  getRepository,
  OneToMany,
} from "typeorm";
import { generateToken } from "../lib/token";
import RefreshTokenORM from "./RefreshTokenORM";
import SocialAccountORM from "./SocialAccountORM";

export type AuthToken = {
  refreshToken: string;
  accessToken: string;
};

export interface IUser {
  id: number;
  username: string;
  email: string;
  thumbnail: string | null;

  // socialAccounts
  createdAt: Date;
  updatedAt: Date;

  generateAuthTokens(): Promise<AuthToken>;
  refresh(refreshToken: string): Promise<AuthToken>;
  revokeRefreshToken(refreshToken: string): Promise<boolean>;
}

@Entity({ name: "user" })
export default class UserORM implements IUser {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column({ unique: true, length: 255 })
  username!: string;

  @Column({ unique: true, length: 255 })
  email!: string;

  @Column({ type: "varchar", length: 512, nullable: true })
  thumbnail: string | null = null;

  @OneToMany((type) => SocialAccountORM, (social) => social.user)
  socialAccounts!: SocialAccountORM[];

  @CreateDateColumn({ type: "timestamptz", name: "created_at" })
  readonly createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz", name: "updated_at" })
  readonly updatedAt!: Date;

  async generateAuthTokens(): Promise<{
    //TODO: refresh
    refreshToken: string;
    accessToken: string;
  }> {
    const accessToken = await this.generateAccessToken();
    const refreshToken = await this.generateRefreshToken();

    return { accessToken, refreshToken };
  }

  generateAccessToken(): Promise<string> {
    return generateToken(
      { id: this.id },
      { expiresIn: "1h", subject: "access_token" }
    );
  }

  async generateRefreshToken(): Promise<string> {
    const refreshTokenDb = new RefreshTokenORM();
    refreshTokenDb.fk_user_id = this.id;
    //TODO
    refreshTokenDb.parent_id = undefined;
    await getRepository(RefreshTokenORM).save(refreshTokenDb);

    return await generateToken(
      {
        email: this.email,
        token_id: refreshTokenDb.id,
      },
      {
        expiresIn: "7d",
        subject: "refresh_token",
      }
    );
  }
}
