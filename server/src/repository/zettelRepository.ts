import { getManager, getRepository } from "typeorm";
import { User } from "./userRepository";
import ZettelDAO from "../entity/ZettelDAO";
import RevisionDAO from "../entity/RevisionDAO";
import TagDAO from "../entity/TagDAO";

type FindOption = {
  userId?: number;
};

export interface Zettel {
  readonly id: number;
  readonly version: number;
  readonly uuid: string;
  title?: string;
  content: string;
  readonly user: User;
  readonly createdAt: Date;
}

type CreateZettelDTO = {
  title?: string;
  content: string;
  tags: string[];
  userId: number;
};

type EditZettelDTO = {
  id: number;
  title?: string;
  content?: string;
  tags?: string[];
  userId: number;
};

export interface ZettelRepository {
  findAll(args: FindOption): Promise<Zettel[]>;
  findByID(args: {
    id: number;
    version?: number;
    userId: number;
  }): Promise<Zettel | null>;
  findByUUID(args: { uuid: string; userId: number }): Promise<Zettel | null>;
  findByTag(tag: string): Promise<Zettel[]>;
  create(args: CreateZettelDTO): Promise<Zettel>;
  createRevision(args: EditZettelDTO): Promise<Zettel>;
  delete(zettelId: number, userId: number): Promise<boolean>;
  save(zettel: Zettel): Promise<boolean>;
}

export default class ZettelRepositoryPostgresql implements ZettelRepository {
  async save(zettel: Zettel): Promise<boolean> {
    return true;
  }
  async findByTag(tag: string): Promise<Zettel[]> {
    throw new Error("Not implemented");
  }

  async createRevision(args: EditZettelDTO): Promise<Zettel> {
    throw new Error("Not implemented");
  }
  async create({
    title,
    content,
    tags,
    userId,
  }: CreateZettelDTO): Promise<Readonly<Zettel> & { tags: string[] }> {
    const manager = getManager();
    const zettel = new ZettelDAO();
    zettel.fk_user_id = userId;
    if (title) zettel.title = title;

    const tagsDAO = await Promise.all(tags.map(TagDAO.findOrCreate));
    zettel.tags = tagsDAO;
    await manager.save(zettel);

    const revision = new RevisionDAO();
    revision.content = content;
    revision.zettel_id = zettel.id;
    revision.version = 1;
    await manager.save(revision);

    return {
      content: revision.content,
      createdAt: revision.createdAt,
      id: zettel.id,
      user: zettel.user,
      uuid: revision.uuid,
      version: revision.version,
      title: zettel.title,
      tags: zettel.tags.map((t) => t.name),
    };
  }

  async delete(zettelId: number, userId: number): Promise<boolean> {
    const zettelRepo = getRepository(ZettelDAO);
    const zettel = await zettelRepo.findOne(zettelId);

    // TODO validate, errorhandling
    if (!zettel || zettel.fk_user_id !== userId) return false;

    const result = await zettelRepo.softDelete(zettel.id);
    return result.affected === 1;
  }

  async findAll({
    userId,
  }: FindOption): Promise<(Readonly<Zettel> & { tags: string[] })[]> {
    if (!userId) return [];
    const result = await getRepository(ZettelDAO)
      .createQueryBuilder("zettel")
      .leftJoinAndSelect("zettel.tags", "tags")
      .leftJoinAndSelect("zettel.revisions", "revisions")
      .andWhere("zettel.fk_user_id=:user_id", { user_id: userId })
      .getMany();

    //TODO reivsion
    return result.map((i) => ({
      content: i.revisions[0].content,
      createdAt: i.revisions[0].createdAt,
      id: i.id,
      user: i.user,
      uuid: i.revisions[0].uuid,
      version: i.revisions[0].version,
      title: i.title,
      tags: i.tags.map((t) => t.name),
    }));
  }

  async findByID({ id, version }: any): Promise<Zettel | null> {
    return null;
    // const { id, userId } = args;
    // const result = await zettelModel.findOne({ id, user: { id: userId } });
    // if (!result) return result;
    // else return result.dto();
  }

  async findByUUID({ uuid }: any): Promise<Zettel | null> {
    return null;
    // const { uuid, userId } = args;
    // const result = await zettelModel.findOne({
    //   "revisions._id": uuid,
    //   user: { id: userId },
    // });
    // if (!result) return result;
    // result.revisions = result.revisions.filter((i) => {
    //   return i["_id"] == uuid;
    // });
    // return result.dto();
  }
}
