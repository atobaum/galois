import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  getRepository,
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
    const repo = getRepository(TagORM);
    let tag = await repo.findOne({ where: { name } });
    if (!tag) {
      tag = new TagORM(name);
      await repo.save(tag);
    }

    return tag;
  }
  constructor(name: string) {
    this.name = name;
  }
}
