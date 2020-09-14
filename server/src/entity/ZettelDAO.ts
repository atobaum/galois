import User from "./UserDAO";
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
import Tag from "./TagDAO";
import RevisionDAO from "./RevisionDAO";

@Entity({ name: "zettel" })
export default class ZettelDAO {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column({ length: 255, nullable: true })
  title!: string;

  @OneToMany((type) => RevisionDAO, (revision) => revision.zettel)
  revisions!: RevisionDAO[];

  @ManyToMany((type) => Tag)
  @JoinTable({ name: "note_tags_tag" })
  tags!: Tag[];

  @Column()
  fk_user_id!: number;

  @ManyToOne((type) => User)
  @JoinColumn({ name: "fk_user_id" })
  user!: User;

  @Column({ name: "is_public", default: false })
  isPublic!: boolean;

  @CreateDateColumn({ type: "timestamptz", name: "created_at" })
  readonly createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz", name: "updated_at" })
  readonly updatedAt!: Date;

  @DeleteDateColumn({ type: "timestamptz", name: "deleted_at" })
  readonly deletedAt?: Date;
}
