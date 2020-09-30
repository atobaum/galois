import { ZettelDTO } from "../../../graphql/zettelSchema";
import Either from "../../../lib/Either";
import AggregateRoot from "../../shared/AggregateRoot";
import Revision, { ContentType } from "./Revision";
import Tag from "./Tag";

export default class Zettel extends AggregateRoot {
  private title: string | null;
  private userId: number;
  private createdAt: Date;
  private revision: Revision;
  private tags: Tag[];

  private constructor(args: {
    title: string | null;
    userId: number;
    createdAt: Date;
    revision: Revision;
    tags: Tag[];
    id?: number;
  }) {
    super(args.id);
    this.title = args.title;
    this.userId = args.userId;
    this.createdAt = args.createdAt;
    this.revision = args.revision;
    this.tags = args.tags;
  }

  public setTitle(newTitle: string): Either<any, Zettel> {
    if (!newTitle) this.title = null;
    else this.title = newTitle;

    return Either.right(this);
    // remove prev change
    // save Change
  }

  public addTag(tagName: string): Either<any, Zettel> {
    const newTag = new Tag(tagName);
    const oldTag = this.tags.find((t) => t.equals(newTag));
    if (oldTag) return Either.left();
    this.tags.push(newTag);

    // save Change
    return Either.right(this);
  }

  public removeTag(tagName: string): Either<any, Zettel> {
    const newTag = new Tag(tagName);
    const index = this.tags.findIndex((t) => t.equals(newTag));
    if (index < 0) return Either.left();
    this.tags.splice(index, 1);

    // change log 추가
    throw new Error();
  }
  public updateContent(
    content: string,
    contentType?: ContentType
  ): Either<any, Zettel> {
    // 이미 수정했는지 확인
    const oldRevisionDTO = this.revision.toDTO();
    const revision = new Revision({
      version: oldRevisionDTO.version + 1,
      type: contentType || oldRevisionDTO.type,
      content,
      createdAt: new Date(),
    });

    this.revision = revision;

    // save Change

    return Either.right(this);
  }

  public toDTO(): ZettelDTO {
    const revision = this.revision.toDTO();
    return {
      id: this._id,
      version: revision.version,
      uuid: revision.uuid,
      title: this.title,
      content: revision.content,
      user: { email: "asdf", username: "Asdf", thumbnail: "safd" },
      // userId: this.userId,
      tags: this.tags.map((t) => t.name),
      createdAt: this.createdAt,
    };
  }

  public static create({
    id,
    version,
    uuid,
    title,
    userId,
    createdAt,
    content,
    contentType,
    tags,
  }: CreateZettelDTO): Either<any, Zettel> {
    // id 있으면 version. uuid, createdAt도 있어야.
    // 다 있거나 다 없거나
    const destiny = [id, version, uuid, createdAt];
    if (!destiny.every((v) => v) && destiny.some((v) => v))
      return Either.left();

    // Version of new zettel is 1
    if (!version) version = 1;

    createdAt = createdAt || new Date();
    const tagEntities = tags.map((t) => new Tag(t));

    const revisionOrFailure = Revision.create({
      version,
      uuid,
      createdAt,
      content,
      contentType,
    });
    if (revisionOrFailure.isLeft) return Either.left();
    const revision = revisionOrFailure.getValue();

    const zettel = new Zettel({
      title,
      userId,
      createdAt,
      revision,
      tags: tagEntities,
      id: id,
    });
    return Either.right(zettel);
  }
}

type CreateZettelDTO = {
  id?: number;
  version?: number;
  uuid?: string;
  title: string | null;
  userId: number;
  createdAt?: Date;
  //updatedAt?: Date;
  content: string;
  contentType: ContentType;
  tags: string[];
};
