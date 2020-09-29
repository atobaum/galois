import IZettelRepository from "./IZettelRepository";
import Zettel from "./entity/Zettle";
import { getManager, getRepository } from "typeorm";
import ZettelORM from "../../typeorm/ZettelORM";
import RevisionORM from "../../typeorm/RevisionORM";
import TagORM from "../../typeorm/TagORM";
import Revision from "./entity/Revision";

export default class TypeormZettelRepository implements IZettelRepository {
  async findAll(args: {
    userId: number;
    limit: number;
    cursor?: number;
  }): Promise<Zettel[]> {
    const query = getRepository(ZettelORM)
      .createQueryBuilder("zettel")
      .leftJoinAndSelect("zettel.tags", "tags")
      .leftJoinAndSelect("zettel.revisions", "revision")
      .andWhere("zettel.fk_user_id=:user_id", { user_id: args.userId })
      .limit(args.limit);

    if (args.cursor) {
      query.andWhere("zettel.id>:cursor", { cursor: args.cursor });
    }

    const result = await query.getMany();

    return result.map((zettelORM) => {
      const revisionORM = zettelORM.revisions[0];
      const revision = new Revision({
        uuid: revisionORM.uuid,
        version: revisionORM.version,
        type: revisionORM.type,
        content: revisionORM.content,
        createdAt: revisionORM.createdAt,
      });

      const zettel = new Zettel({
        title: zettelORM.title,
        userId: zettelORM.fk_user_id,
        createdAt: zettelORM.createdAt,
        revision: revision,
        tags: zettelORM.tags.map((t) => t.name),
        id: zettelORM.id,
      });
      return zettel;
    });
  }

  findByTag(tag: string): Promise<Zettel[]> {
    throw new Error("Method not implemented.");
  }

  async findById(id: number, option?: any): Promise<Zettel | null> {
    const repo = getRepository(ZettelORM);
    const result = await repo
      .createQueryBuilder("zettel")
      .leftJoinAndSelect("zettel.tags", "tags")
      .leftJoinAndSelect("zettel.revisions", "revision")
      .andWhere("zettel.deletedAt IS NULL");
    if (!result) return null;
    return null;
  }

  findByUUID(uuid: string): Promise<Zettel | null> {
    throw new Error("Method not implemented.");
  }

  save(zettel: Zettel): Promise<number> {
    if (zettel.isNew()) return this.createZettel(zettel);
    else return this.updateZettel(zettel);
  }

  private async createZettel(zettel: Zettel): Promise<number> {
    const zettelORM = new ZettelORM();
    zettelORM.fk_user_id = zettel.userId;
    zettelORM.createdAt = zettel.createdAt;
    zettelORM.title = zettel.title;

    const revisionORM = new RevisionORM();
    const revisionDTO = zettel.revision.toDTO();
    revisionORM.version = 1;
    revisionORM.content = revisionDTO.content;
    revisionORM.createdAt = revisionDTO.createdAt;
    revisionORM.type = revisionDTO.type;

    //tags
    const tagsORM = await Promise.all(zettel.tags.map(TagORM.findOrCreate));
    zettelORM.tags = tagsORM;

    const manager = getManager();
    await manager.save(zettel);

    revisionORM.zettel_id = zettelORM.id;
    await manager.save(revisionORM);

    zettel.id = zettelORM.id;
    zettel.revision = new Revision({
      uuid: revisionORM.uuid,
      version: 1,
      content: revisionORM.content,
      type: revisionORM.type,
      createdAt: revisionORM.createdAt,
    });

    return zettelORM.id;
  }

  private async updateZettel(zettel: Zettel): Promise<number> {
    throw new Error("Method not implemented.");
  }

  async delete(zettelId: number): Promise<void> {
    const zettelRepo = getRepository(ZettelORM);
    const result = await zettelRepo.softDelete(zettelId);
  }
}
