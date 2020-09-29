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
  OneToMany,
} from "typeorm";
import TagORM from "./TagORM";
import RevisionORM from "./RevisionORM";

@Entity({ name: "zettel" })
export default class ZettelORM {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column({ length: 255, nullable: true })
  title!: string | null;

  @OneToMany((type) => RevisionORM, (revision) => revision.zettel)
  revisions!: RevisionORM[];

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

  @CreateDateColumn({ type: "timestamptz", name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz", name: "updated_at" })
  readonly updatedAt!: Date;

  @DeleteDateColumn({ type: "timestamptz", name: "deleted_at" })
  readonly deletedAt?: Date;
}
