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
} from "typeorm";
import Tag from "./TagDAO";

@Entity({ name: "zettel" })
export default class ZettelDAO {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column({ length: 255, nullable: true })
  title!: string;

  @Column({ length: 255, nullable: true })
  slug?: string;

  @Column()
  fk_author_id!: number;

  @ManyToOne((type) => User)
  @JoinColumn({ name: "fk_author_id" })
  user!: User;

  @ManyToMany((type) => Tag)
  @JoinTable({ name: "note_tags_tag" })
  tags!: Tag[];

  @Column({ name: "is_public", default: false })
  isPublic!: boolean;

  @CreateDateColumn({ type: "timestamptz", name: "created_at" })
  readonly createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz", name: "updated_at" })
  readonly updatedAt!: Date;

  @DeleteDateColumn({ type: "timestamptz", name: "deleted_at" })
  readonly deletedAt?: Date;
}
