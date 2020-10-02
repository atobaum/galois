import IZettelRepository from "./IZettelRepository";
import Zettel from "./entity/Zettle";
import { getManager, getRepository } from "typeorm";
import ZettelORM from "../../typeorm/ZettelORM";
import RevisionORM from "../../typeorm/RevisionORM";
import TagORM from "../../typeorm/TagORM";
import { Collection } from "../../graphql/zettelSchema";
import Either from "../../lib/Either";

export default class TypeormZettelRepository implements IZettelRepository {
  async findAll(args: {
    userId: number;
    limit: number;
    cursor?: number;
  }): Promise<Either<any, Collection<Zettel>>> {
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

    const temp = result.map((zettelORM) => {
      const revisionORM = zettelORM.revisions[0];

      const zettel = Zettel.create({
        title: zettelORM.title,
        userId: zettelORM.fk_user_id,
        createdAt: zettelORM.createdAt,
        uuid: revisionORM.uuid,
        version: revisionORM.version,
        revision: {
          content: revisionORM.content,
          type: revisionORM.type,
        },
        tags: zettelORM.tags.map((t) => t.name),
        id: zettelORM.id,
      });
      return zettel;
    });

    return Either.right({ data: temp.map((zettel) => zettel.getRight()) });
  }

  findByTag(tag: string): Promise<Either<any, Collection<Zettel>>> {
    throw new Error("Method not implemented.");
  }

  async findById(id: number, option?: any): Promise<Either<any, Zettel>> {
    const repo = getRepository(ZettelORM);
    const result = await repo
      .createQueryBuilder("zettel")
      .leftJoinAndSelect("zettel.tags", "tags")
      .leftJoinAndSelect("zettel.revisions", "revision")
      .leftJoinAndSelect("zettel.user", "user")
      .andWhere("zettel.deletedAt IS NULL")
      .andWhere("zettel.id=:id", { id })
      .getOne();
    return Either.fromNullable(result).flatMap((orm) => {
      const revision = orm.revisions[0];
      return Zettel.create({
        id: orm.id,
        version: revision.version,
        uuid: revision.uuid,
        title: orm.title,
        userId: orm.user.id,
        createdAt: orm.createdAt,
        revision: {
          content: revision.content,
          type: revision.type,
        },
        tags: orm.tags.map((t) => t.name),
      });
    });
  }

  findByUUID(uuid: string): any {
    throw new Error("Method not implemented.");
  }

  save(zettel: Zettel): Promise<Either<any, number>> {
    if (zettel.isNew()) return this.createZettel(zettel);
    else return this.updateZettel(zettel);
  }

  private async createZettel(zettel: Zettel): Promise<Either<any, number>> {
    const zettelORM = new ZettelORM();
    const dto = zettel.toDTO();
    zettelORM.fk_user_id = 1;
    zettelORM.createdAt = dto.createdAt;
    zettelORM.title = dto.title;

    const revisionORM = new RevisionORM();
    revisionORM.version = 1;
    revisionORM.content = dto.content;
    revisionORM.createdAt = dto.createdAt;
    revisionORM.type = dto.contentType;

    //tags
    const tagsORM = await Promise.all(dto.tags.map(TagORM.findOrCreate));
    zettelORM.tags = tagsORM;

    const manager = getManager();
    await manager.save(zettelORM);

    revisionORM.zettel_id = zettelORM.id;
    await manager.save(revisionORM);

    zettel.id = zettelORM.id;
    zettel.getRevision().setUUID(revisionORM.uuid);

    return Either.right(zettelORM.id);
  }

  private async updateZettel(zettel: Zettel): Promise<Either<any, number>> {
    throw new Error("Method not implemented.");
  }

  async delete(zettelId: number): Promise<any> {
    const zettelRepo = getRepository(ZettelORM);
    const result = await zettelRepo.softDelete(zettelId);
  }
}
