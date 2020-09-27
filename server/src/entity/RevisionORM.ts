import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
  CreateDateColumn,
  DeleteDateColumn,
  JoinColumn,
} from "typeorm";
import ZettelORM from "./ZettelORM";

@Entity({ name: "revision" })
@Index(["zettel_id", "version"], { unique: true })
export default class RevisionORM {
  @PrimaryGeneratedColumn("uuid")
  readonly uuid!: string;

  @Column()
  zettel_id!: number;

  @ManyToOne((type) => ZettelORM, (zettel) => zettel.revisions)
  @JoinColumn({ name: "zettel_id" })
  zettel!: ZettelORM;

  @Column()
  version!: number;

  @Column("text")
  content!: string;

  @CreateDateColumn({ type: "timestamptz", name: "created_at" })
  readonly createdAt!: Date;

  @DeleteDateColumn({ type: "timestamptz", name: "deleted_at" })
  readonly deletedAt?: Date;
}
