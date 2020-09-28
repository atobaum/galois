import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
} from "typeorm";
import UserORM from "./UserORM";

@Entity({ name: "social_account" })
@Index(["provider", "socialId"])
export default class SocialAccountORM {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 16 })
  provider!: string;

  @Column({ name: "social_id", type: "varchar", length: 255 })
  socialId!: string;

  @Column()
  fk_user_id!: number;

  @ManyToOne((type) => UserORM)
  @JoinColumn({ name: "fk_user_id" })
  user!: UserORM;

  @CreateDateColumn({ type: "timestamptz", name: "created_at" })
  readonly createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz", name: "updated_at" })
  readonly updatedAt!: Date;

  @DeleteDateColumn({ type: "timestamptz", name: "deleted_at" })
  readonly deletedAt?: Date;
}
