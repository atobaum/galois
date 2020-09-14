import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
  CreateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import ZettelDAO from "./ZettelDAO";

@Entity({ name: "revision" })
@Index(["id", "version"], { unique: true })
export default class RevisionDAO {
  @PrimaryGeneratedColumn("uuid")
  readonly uuid!: string;

  @Column()
  @ManyToOne((type) => ZettelDAO)
  readonly id!: number;

  @Column()
  readonly version!: number;

  @Column("text")
  content!: string;

  @CreateDateColumn({ type: "timestamptz", name: "created_at" })
  readonly createdAt!: Date;

  @DeleteDateColumn({ type: "timestamptz", name: "deleted_at" })
  readonly deletedAt?: Date;
}
