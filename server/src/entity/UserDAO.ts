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
import RefreshToken from "./RefreshTokenDAO";
import SocialAccountDAO from "./SocialAccountDAO";

@Entity({ name: "user" })
export default class UserDAO {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column({ unique: true, length: 255 })
  username!: string;

  @Column({ unique: true, length: 255 })
  email!: string;

  @Column({ type: "varchar", length: 512, nullable: true })
  thumbnail?: string;

  @OneToMany((type) => SocialAccountDAO, (social) => social.user)
  socialAccounts!: SocialAccountDAO[];

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
    const refreshTokenDb = new RefreshToken();
    refreshTokenDb.fk_user_id = this.id;
    //TODO
    refreshTokenDb.parent_id = undefined;
    await getRepository(RefreshToken).save(refreshTokenDb);

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
