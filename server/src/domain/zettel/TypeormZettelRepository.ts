import { getManager, getRepository } from "typeorm";
import zettelNumberGenerator from "../../util/zettel-number-generator";
import IZettelRepository from "./IZettelRepository";
import Zettel from "./entity/Zettle";
import ZettelORM from "../../typeorm/ZettelORM";
import TagORM from "../../typeorm/TagORM";
import { Collection } from "../../graphql/zettelSchema";
import Either from "../../lib/Either";
import Tag from "./entity/Tag";

export default class TypeormZettelRepository implements IZettelRepository {
  async findAll(args: {
    userId: number;
    limit: number;
    cursor?: string;
  }): Promise<Either<any, Collection<Zettel>>> {
    const query = getRepository(ZettelORM)
      .createQueryBuilder("zettel")
      .leftJoinAndSelect("zettel.tags", "tags")
      .andWhere("zettel.fk_user_id=:user_id", { user_id: args.userId })
      .orderBy({ number: "DESC" })
      .limit(args.limit);

    if (args.cursor) {
      query.andWhere("zettel.number<:cursor", { cursor: args.cursor });
    }

    const result = await query.getMany();

    const temp = result.map((zettelORM) => {
      const zettel = Zettel.create({
        id: zettelORM.uuid,
        number: zettelORM.number,
        title: zettelORM.title,
        userId: zettelORM.fk_user_id,
        content: zettelORM.content,
        contentType: zettelORM.contentType,
        tags: zettelORM.tags.map((t) => t.name),
        createdAt: zettelORM.createdAt,
        updatedAt: zettelORM.updatedAt,
        meta: zettelORM.meta,
      });
      return zettel;
    });

    const nextCursor = result.length
      ? String(result[result.length - 1].number)
      : args.cursor;

    return Either.right({
      data: temp.map((zettel) => zettel.getRight()),
      nextCursor,
    });
  }

  findByTag(tag: string): Promise<Either<any, Collection<Zettel>>> {
    throw new Error("Method not implemented.");
  }

  async findById(id: string, option?: any): Promise<Either<any, Zettel>> {
    const repo = getRepository(ZettelORM);
    const result = await repo
      .createQueryBuilder("zettel")
      .leftJoinAndSelect("zettel.tags", "tags")
      .leftJoinAndSelect("zettel.user", "user")
      .andWhere("zettel.deletedAt IS NULL")
      .andWhere("zettel.uuid=:id", { id })
      .getOne();

    return Either.fromNullable(result).flatMap((orm) => {
      return Zettel.create({
        id: orm.uuid,
        number: orm.number,
        title: orm.title,
        userId: orm.user.id,
        createdAt: orm.createdAt,
        updatedAt: orm.updatedAt,
        content: orm.content,
        contentType: orm.contentType,
        tags: orm.tags.map((t) => t.name),
        meta: orm.meta,
      });
    });
  }

  async findByNumber(
    number: number,
    userId: number
  ): Promise<Either<any, Zettel>> {
    const repo = getRepository(ZettelORM);
    const result = await repo
      .createQueryBuilder("zettel")
      .leftJoinAndSelect("zettel.tags", "tags")
      .leftJoinAndSelect("zettel.user", "user")
      .andWhere("zettel.deletedAt IS NULL")
      .andWhere("zettel.fk_user_id=:userId", { userId })
      .andWhere("zettel.number=:number", { number })
      .getOne();

    return Either.fromNullable(result).flatMap((orm) => {
      return Zettel.create({
        id: orm.uuid,
        number: orm.number,
        title: orm.title,
        userId: orm.user.id,
        createdAt: orm.createdAt,
        updatedAt: orm.updatedAt,
        content: orm.content,
        contentType: orm.contentType,
        tags: orm.tags.map((t) => t.name),
        meta: orm.meta,
      });
    });
  }

  findByUUID(uuid: string): any {
    throw new Error("Method not implemented.");
  }

  save(zettel: Zettel): Promise<Either<any, string>> {
    if (zettel.isNew()) return this.createZettel(zettel);
    else return this.updateZettel(zettel);
  }

  private async createZettel(zettel: Zettel): Promise<Either<any, string>> {
    const manager = getManager();
    const repo = getRepository(ZettelORM);
    const prevMaxNumber = (
      await repo.findOne({
        where: {
          fk_user_id: zettel.getUserId(),
        },
        order: { number: "DESC" },
        select: ["number"],
      })
    )?.number;
    const newNumber = zettelNumberGenerator(prevMaxNumber);

    const zettelORM = new ZettelORM();
    const dto = zettel.toDTO();
    zettelORM.number = newNumber;
    zettelORM.fk_user_id = zettel.getUserId();
    zettelORM.content = dto.content;
    zettelORM.contentType = dto.contentType;
    zettelORM.createdAt = dto.createdAt;
    zettelORM.title = dto.title;
    zettelORM.meta = dto.meta;

    //tags
    const tagsORM = await Promise.all(dto.tags.map(TagORM.findOrCreate));
    zettelORM.tags = tagsORM;

    await manager.save(zettelORM);

    return Either.right(zettelORM.uuid);
  }

  private async updateZettel(zettel: Zettel): Promise<Either<any, string>> {
    const changes = zettel.getChanges();
    if (changes.length == 0) return Either.right(zettel.id);

    const repo = getRepository(ZettelORM);
    let orm = await repo.findOne({
      where: { uuid: zettel.id, deletedAt: null },
      relations: ["tags"],
    });

    if (!orm) return Either.left(`Zettel of id ${zettel.id} is not exist`);

    const dto = zettel.toDTO();

    for (const change of changes) {
      switch (change[0]) {
        case "ADD_TAG":
          orm.tags.push(await TagORM.findOrCreate(change[1].name));
          break;
        case "REMOVE_TAG":
          orm.tags = orm.tags.filter((t) => !change[1].equals(new Tag(t.name)));
          break;
        case "UPDATE_TITLE":
          orm.title = dto.title;
          break;
        case "UPDATE_CONTENT":
          orm.content = dto.content;
          orm.contentType = dto.contentType;
          break;
        case "UPDATE_META":
          orm.meta = dto.meta;
        default:
          Either.left("Unsupported change type: " + change[0]);
      }
    }

    try {
      orm = await repo.save(orm);
    } catch (e) {
      return Either.left("Error while saving: " + e);
    }

    zettel.completeUpdate(orm.updatedAt);
    return Either.right(zettel.id);
  }

  async delete(zettelId: string): Promise<any> {
    const zettelRepo = getRepository(ZettelORM);
    const result = await zettelRepo.softDelete(zettelId);
  }
}
