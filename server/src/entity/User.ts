import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  getManager,
  getRepository,
} from "typeorm";
import bcrypt from "bcrypt";
import { generateToken } from "../lib/token";
import UserMeta from "./UserMeta";
import Note, { NoteType } from "./Note";
import RefreshToken from "./RefreshToken";

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column({ unique: true, length: 255 })
  username!: string;

  @Column({ unique: true, length: 255 })
  email!: string;

  @Column()
  private password!: string;

  @OneToOne((type) => UserMeta, (userMeta) => userMeta.user)
  userMeta!: UserMeta;

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

  async refreshToken() {}
  async setPassword(password: string): Promise<void> {
    return bcrypt.hash(password, 10).then((hash) => {
      this.password = hash;
    });
  }

  checkPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  async initUser(): Promise<void> {
    const manager = getManager();

    let userMeta = await manager.findOne(UserMeta, {
      where: { fk_user_id: this.id },
    });
    if (userMeta) return;

    const inboxNote = new Note();
    inboxNote.author = this;
    inboxNote.type = NoteType.list;
    inboxNote.content = "";
    await manager.save(Note, inboxNote);

    userMeta = new UserMeta();
    userMeta.fk_user_id = this.id;
    userMeta.fk_inbox_id = inboxNote.id;
    await manager.save(UserMeta, userMeta);
  }
}
