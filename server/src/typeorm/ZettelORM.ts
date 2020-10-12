import User from "./UserORM";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  DeleteDateColumn,
  JoinColumn,
  Index,
  Generated,
} from "typeorm";
import TagORM from "./TagORM";
import { ContentType } from "@src/domain/zettel/entity/Revision";

@Entity({ name: "zettel" })
@Index(["fk_user_id", "number"], { unique: true })
export default class ZettelORM {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Index()
  @Column()
  @Generated("uuid")
  readonly uuid!: string;

  @Column({ type: "integer", nullable: false })
  number!: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  title!: string | null;

  @Column({ name: "content_type", type: "varchar", length: 16, default: "md" })
  contentType!: ContentType;

  @Column("text")
  content!: string;

  @ManyToMany((type) => TagORM)
  @JoinTable({ name: "note_tags_tag" })
  tags!: TagORM[];

  @Column()
  fk_user_id!: number;

  @ManyToOne((type) => User)
  @JoinColumn({ name: "fk_user_id" })
  user!: User;

  @Column({ name: "is_public", default: false })
  isPublic!: boolean;

  // @Column({ name: "project_id", nullable: true })
  // projectId?: string;

  @CreateDateColumn({ type: "timestamptz", name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz", name: "updated_at" })
  readonly updatedAt!: Date;

  @DeleteDateColumn({ type: "timestamptz", name: "deleted_at" })
  readonly deletedAt?: Date;
}
