import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  getRepository,
  CreateDateColumn,
} from "typeorm";

@Entity({ name: "tag" })
export default class TagDAO {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column("varchar", { length: 64 })
  name!: string;

  @CreateDateColumn({ type: "timestamptz", name: "created_at" })
  readonly createdAt!: Date;

  static async findOrCreate(name: string): Promise<TagDAO> {
    const tagRepo = getRepository(TagDAO);
    const tag = await tagRepo.findOne({ name });
    if (tag) return tag;

    const newTag = new TagDAO();
    newTag.name = name;
    await tagRepo.save(newTag);
    return newTag;
  }
}
