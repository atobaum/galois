import IZettelRepository from "@src/domain/zettel/IZettelRepository";
import Either from "../lib/Either";
import { ContentType } from "../domain/zettel/entity/Revision";
import Zettel from "../domain/zettel/entity/Zettle";
import { Collection, ZettelDTO } from "../graphql/zettelSchema";

type FindZettelOption = {
  cursor?: number;
  limit: number;
};
type CreateZettelRequestDTO = {
  title: string | null;
  content: string;
  contentType: ContentType;
  tags: string[];
};

export default class ZettelService {
  private zettelRepo: IZettelRepository;
  constructor(zettelRepo: IZettelRepository) {
    this.zettelRepo = zettelRepo;
  }

  getZettelById(
    args: { id: number; version?: number },
    userId: number
  ): Promise<Zettel> {
    throw new Error("NOT_IMPLEMENTED");
  }

  getZettelByUUID(uuid: string, userId: number): Promise<Zettel> {
    throw new Error("NOT_IMPLEMENTED");
  }

  findZettelByTag(tag: string, userId: number): Promise<Collection<Zettel>> {
    throw new Error("NOT_IMPLEMENTED");
  }

  async findZettels(
    option: FindZettelOption,
    userId: number
  ): Promise<Either<any, Collection<ZettelDTO>>> {
    const collection = await this.zettelRepo.findAll({
      limit: option.limit,
      userId,
    });
    return collection.map((c) => ({
      data: c.data.map((z) => z.toDTO()),
      nextCursor: c.nextCursor,
    }));
  }

  getRevisions(id: number, userId: number): Promise<Zettel> {
    throw new Error("NOT_IMPLEMENTED");
  }

  async createZettel(
    args: CreateZettelRequestDTO,
    userId: number
  ): Promise<Either<any, Zettel>> {
    const newZettel = await Zettel.create({
      createdAt: new Date(),
      content: args.content,
      contentType: args.contentType,
      tags: args.tags,
      title: args.title,
      userId,
    });

    if (newZettel.isLeft) return newZettel;
    const id = await this.zettelRepo.save(newZettel.getRight());

    if (id.isLeft) return Either.left(id.getLeft());
    return await this.zettelRepo.findById(id.getRight());
  }

  createRevision(
    args: {
      id: number;
      title: string;
      tags: string[];
      content: string;
      contentType: ContentType;
    },
    userId: number
  ): Promise<Either<any, Zettel>> {
    throw new Error("NOT_IMPLEMENTED");
  }

  updateTitle(
    args: { id: number; title: string | null },
    newTitle: any
  ): Promise<Zettel> {
    throw new Error("NOT_IMPLEMENTED");
  }

  updateTags(
    args: { id: number; tags: string[] },
    newTags: string[]
  ): Promise<Zettel> {
    throw new Error("NOT_IMPLEMENTED");
  }

  removeZettel(id: number, userId: number): Promise<boolean> {
    throw new Error("NOT_IMPLEMENTED");
  }

  removeRevision(uuid: string, userId: number): Promise<boolean> {
    throw new Error("NOT_IMPLEMENTED");
  }
}
