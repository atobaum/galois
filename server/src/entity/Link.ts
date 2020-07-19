import {
  Column,
  ManyToOne,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
} from "typeorm";
import Note from "./Note";

export enum LinkType {
  externalSource = "src", //url(display name??), book, quote,
  reference = "ref", //internal link
  parent = "par",
  listItem = "li",
}

@Entity()
export default class Link {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column()
  fk_note_id!: number;

  @Column()
  fk_target_note_id!: number;

  @ManyToOne((type) => Note, (note) => note.links, { onDelete: "CASCADE" })
  @JoinColumn({ name: "fk_note_id" })
  note!: Note;

  @ManyToOne((type) => Note, { onDelete: "CASCADE" })
  @JoinColumn({ name: "fk_target_note_id" })
  targetNote!: Note;

  @Column("varchar", { length: 16 })
  type!: LinkType;

  @Column("text", { nullable: true })
  body?: string;
}

//www.naver.com,네이버
