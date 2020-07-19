import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  ManyToMany,
  getRepository,
} from "typeorm";
import Note from "./Note";

@Entity()
export default class Tag {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column("varchar", { length: 64 })
  name!: string;

  @ManyToMany((type) => Note, (note) => note.tags)
  notes!: Note[];

  static async findOrCreate(name: string): Promise<Tag> {
    const tagRepo = getRepository(Tag);
    const tag = await tagRepo.findOne({ name });
    if (tag) return tag;

    const newTag = new Tag();
    newTag.name = name;
    await tagRepo.save(newTag);
    return newTag;
  }
}
