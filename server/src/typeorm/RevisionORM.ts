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
import { ContentType } from "../domain/zettel/entity/Revision";
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

  @Column({ type: "varchar", length: 16, default: "md" })
  type!: ContentType;

  @Column("text")
  content!: string;

  @CreateDateColumn({ type: "timestamptz", name: "created_at" })
  createdAt!: Date;

  @DeleteDateColumn({ type: "timestamptz", name: "deleted_at" })
  readonly deletedAt?: Date;
}
