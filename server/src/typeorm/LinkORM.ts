import {
  Column,
  ManyToOne,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
} from "typeorm";
import ZettelORM from "./ZettelORM";

export enum LinkType {
  externalSource = "src", //url(display name??), book, quote,
  reference = "ref", //internal link
  parent = "par",
  listItem = "li",
}

@Entity({ name: "link" })
export default class LinkORM {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column()
  fk_from_zettel_id!: number;

  @Column()
  fk_to_zettel_id!: number;

  @ManyToOne((type) => ZettelORM, { onDelete: "CASCADE" })
  @JoinColumn({ name: "fk_from_zettel_id" })
  fromZettel!: ZettelORM;

  @ManyToOne((type) => ZettelORM, { onDelete: "CASCADE" })
  @JoinColumn({ name: "fk_to_zettel_id" })
  toZettel!: ZettelORM;

  @Column("varchar", { length: 16, default: LinkType.reference })
  type!: LinkType;

  @Column("text", { nullable: true })
  body?: string;
}
