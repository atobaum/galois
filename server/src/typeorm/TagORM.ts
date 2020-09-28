import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  getRepository,
  CreateDateColumn,
} from "typeorm";

@Entity({ name: "tag" })
export default class TagORM {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column("varchar", { length: 64 })
  name!: string;

  @CreateDateColumn({ type: "timestamptz", name: "created_at" })
  readonly createdAt!: Date;

  static async findOrCreate(name: string): Promise<TagORM> {
    const tagRepo = getRepository(TagORM);
    const tag = await tagRepo.findOne({ name });
    if (tag) return tag;

    const newTag = new TagORM();
    newTag.name = name;
    await tagRepo.save(newTag);
    return newTag;
  }
}
