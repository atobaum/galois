import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Column,
  JoinColumn,
  DeleteDateColumn,
} from "typeorm";
import UserORM from "./UserORM";

@Entity({ name: "refresh_token" })
export default class RefreshTokenORM {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  fk_user_id!: number;

  @CreateDateColumn({ type: "timestamptz", name: "created_at" })
  createdAt!: Date;

  @DeleteDateColumn({ type: "timestamptz", name: "revoked_at" })
  revokedAt!: Date;

  @ManyToOne((type) => UserORM, { onDelete: "CASCADE" })
  @JoinColumn({ name: "fk_user_id" })
  user!: UserORM;
}
