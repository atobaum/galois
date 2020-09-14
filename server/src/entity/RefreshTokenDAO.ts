import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Column,
  JoinColumn,
  DeleteDateColumn,
} from "typeorm";
import UserDAO from "./UserDAO";

@Entity({ name: "refresh_token" })
export default class RefreshTokenDAO {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  fk_user_id!: number;

  @Column({ default: false })
  disabled!: boolean;

  // TODO
  @Column({ nullable: true })
  parent_id?: number;

  @CreateDateColumn({ type: "timestamptz", name: "created_at" })
  readonly createdAt!: Date;

  @DeleteDateColumn({ type: "timestamptz", name: "revoked_at" })
  readonly revokedAt!: Date;

  @ManyToOne((type) => UserDAO, { onDelete: "CASCADE" })
  @JoinColumn({ name: "fk_user_id" })
  user!: UserDAO;
}
