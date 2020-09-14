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
import ZettelDAO from "./ZettelDAO";

@Entity({ name: "revision" })
@Index(["zettel_id", "version"], { unique: true })
export default class RevisionDAO {
  @PrimaryGeneratedColumn("uuid")
  readonly uuid!: string;

  @Column()
  zettel_id!: number;

  @ManyToOne((type) => ZettelDAO, (zettel) => zettel.revisions)
  @JoinColumn({ name: "zettel_id" })
  zettel!: ZettelDAO;

  @Column()
  version!: number;

  @Column("text")
  content!: string;

  @CreateDateColumn({ type: "timestamptz", name: "created_at" })
  readonly createdAt!: Date;

  @DeleteDateColumn({ type: "timestamptz", name: "deleted_at" })
  readonly deletedAt?: Date;
}
