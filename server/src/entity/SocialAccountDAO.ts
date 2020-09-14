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
import UserDAO from "./UserDAO";

@Entity({ name: "social_account" })
@Index(["provider", "socialId"])
export default class SocialAccountDAO {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 16 })
  provider!: string;

  @Column({ name: "social_id", type: "varchar", length: 255 })
  socialId!: string;

  @Column()
  fk_user_id!: number;

  @ManyToOne((type) => UserDAO)
  @JoinColumn({ name: "fk_user_id" })
  user!: UserDAO;

  @CreateDateColumn({ type: "timestamptz", name: "created_at" })
  readonly createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz", name: "updated_at" })
  readonly updatedAt!: Date;

  @DeleteDateColumn({ type: "timestamptz", name: "deleted_at" })
  readonly deletedAt?: Date;
}
