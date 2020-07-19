import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Column,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import User from "./User";

@Entity()
export default class RefreshToken {
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

  @UpdateDateColumn({ type: "timestamptz", name: "updated_at" })
  readonly updatedAt!: Date;

  @ManyToOne((type) => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "fk_user_id" })
  user!: User;
}
