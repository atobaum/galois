import User from "./User";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
  ManyToMany,
  JoinTable,
  ManyToOne,
  OneToMany,
  DeleteDateColumn,
  JoinColumn,
} from "typeorm";
import Tag from "./Tag";
import Link from "./Link";

export enum NoteType {
  scrap = "scrap", //scrap, quote
  memo = "memo",
  article = "article",
  list = "list",
}

export enum ContentType {
  plain = "txt",
  markdown = "md",
}

@Entity()
export default class Note {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column({ type: "uuid", unique: true })
  @Generated("uuid")
  uuid!: string;

  @Column({ length: 255, nullable: true })
  title!: string;

  @Column({ length: 255, nullable: true })
  slug?: string;

  @Column()
  fk_author_id!: number;

  @ManyToOne((type) => User)
  @JoinColumn({ name: "fk_author_id" })
  author!: User;

  @Column({
    type: "enum",
    enum: NoteType,
  })
  type!: NoteType;

  @Column({ default: ContentType.plain })
  contentType!: ContentType;

  @Column("text")
  content!: string;

  @ManyToMany((type) => Tag, (tag) => tag.notes)
  @JoinTable({ name: "note_tags_tag" })
  tags!: Tag[];

  @Column({ name: "is_public", default: false })
  isPublic!: boolean;

  @Column({ nullable: true })
  source?: string;

  @OneToMany((type) => Link, (link) => link.note)
  links!: Promise<Link[]>;

  @OneToMany((type) => Link, (link) => link.targetNote)
  readonly backLinks!: Promise<Link[]>;

  @CreateDateColumn({ type: "timestamptz", name: "created_at" })
  readonly createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz", name: "updated_at" })
  readonly updatedAt!: Date;

  @DeleteDateColumn({ type: "timestamptz", name: "deleted_at" })
  readonly deletedAt?: Date;
}
