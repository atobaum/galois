import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  getRepository,
  CreateDateColumn,
} from "typeorm";

@Entity({ name: "tag" })
export default class TagORM {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column("varchar", { length: 64 })
  name!: string;

  @CreateDateColumn({ type: "timestamptz", name: "created_at" })
  readonly createdAt!: Date;
}
