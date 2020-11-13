import Either from "../lib/Either";
import IZettelRepository from "../domain/zettel/IZettelRepository";
import Zettel, { ContentType } from "../domain/zettel/entity/Zettle";
import { Collection, ZettelDTO } from "../graphql/zettelSchema";

type FindZettelOption = {
  cursor?: string;
  limit: number;
};
type CreateZettelRequestDTO = {
  title: string | null;
  content: string;
  contentType: ContentType;
  tags: string[];
};

type UpdateZettelRequestDTO = Partial<CreateZettelRequestDTO> & {
  id: string;
};

export default class ZettelService {
  private zettelRepo: IZettelRepository;
  constructor(zettelRepo: IZettelRepository) {
    this.zettelRepo = zettelRepo;
  }

  async getZettelById(
    zettelId: string,
    userId: number
  ): Promise<Either<any, Zettel>> {
    const zettel = await this.zettelRepo.findById(zettelId);
    return zettel.flatMap((z) => {
      if (z.getUserId() === userId) return Either.right(z);
      else return Either.left("NOT_AUTHORIZED");
    });
  }

  async getZettelByNumber(
    zettelNumber: number,
    userId: number
  ): Promise<Either<any, Zettel>> {
    const zettel = await this.zettelRepo.findByNumber(zettelNumber, userId);
    return zettel.flatMap((z) => {
      if (z.getUserId() === userId) return Either.right(z);
      else return Either.left("NOT_AUTHORIZED");
    });
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
      cursor: option.cursor,
      userId,
    });
    return collection.map((c) => ({
      data: c.data.map((z) => z.toDTO()),
      nextCursor: c.nextCursor,
    }));
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

  async updateZettel(
    args: UpdateZettelRequestDTO,
    userId: number
  ): Promise<Either<any, Zettel>> {
    const zettelOrFail = await this.zettelRepo.findById(args.id, userId);
    if (zettelOrFail.isLeft || zettelOrFail.getRight().getUserId() !== userId)
      return Either.left("NOT_AUTHORIZED");
    const zettel = zettelOrFail.getRight();

    if (args.title !== undefined) {
      zettel.updateTitle(args.title);
    }

    if (args.content) {
      if (args.contentType) {
        zettel.updateContent(args.content, args.contentType);
      }
      zettel.updateContent(args.content);
    }

    if (args.tags) {
      const dto = zettel.toDTO();
      for (const newTag of args.tags) {
        if (!dto.tags.find((t) => t === newTag)) zettel.addTag(newTag);
      }

      for (const oldTag of dto.tags) {
        if (!args.tags.find((t) => t === oldTag)) zettel.removeTag(oldTag);
      }
    }

    const result = await this.zettelRepo.save(zettel);
    if (result.isLeft) return result as Either<any, any>;
    return this.getZettelById(result.getRight(), userId);
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
}
