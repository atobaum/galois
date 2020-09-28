import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import SocialAccountORM from "./SocialAccountORM";

@Entity({ name: "user" })
export default class UserORM {
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
}
