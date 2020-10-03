import { ZettelDTO } from "../../../graphql/zettelSchema";
import Either from "../../../lib/Either";
import AggregateRoot from "../../shared/AggregateRoot";
import Revision, { ContentType } from "./Revision";
import Tag from "./Tag";

export type ZettelChange =
  | ["ADD_TAG", Tag]
  | ["REMOVE_TAG", Tag]
  | ["SET_TITLE"]
  | ["UPDATE_CONTENT"];

export default class Zettel extends AggregateRoot<ZettelChange> {
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

  public getRevision(): Revision {
    return this.revision;
  }

  public setTitle(newTitle: string): Either<any, Zettel> {
    if (!newTitle) this.title = null;
    else this.title = newTitle;

    this.addChange(["SET_TITLE"]);

    return Either.right(this);
    // remove prev change
    // save Change
  }

  public addTag(tagName: string): Either<any, Zettel> {
    const newTag = new Tag(tagName);
    if (this.changes.some((t) => t[1]?.equals(newTag)))
      return Either.left("Cannot add removed tag: " + tagName);

    const oldTag = this.tags.find((t) => t.equals(newTag));
    if (oldTag) return Either.left("Cannot add existing tag: " + tagName);

    this.tags.push(newTag);

    this.addChange(["ADD_TAG", newTag]);
    return Either.right(this);
  }

  public removeTag(tagName: string): Either<any, Zettel> {
    const newTag = new Tag(tagName);
    if (this.changes.some((t) => t[1]?.equals(newTag)))
      return Either.left("Cannot remove added tag: " + tagName);

    const index = this.tags.findIndex((t) => t.equals(newTag));
    if (index < 0)
      return Either.left("Zettel.removeTag: Np such tag " + tagName);
    this.tags.splice(index, 1);

    this.addChange(["REMOVE_TAG", newTag]);
    // change log 추가
    return Either.right(this);
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
      contentType: revision.type,
      //TODO user
      user: {
        id: this.userId,
        email: "asdf",
        username: "Asdf",
        thumbnail: "safd",
      },
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
    revision: { content, type: contentType },
    tags,
  }: CreateZettelDTO): Either<any, Zettel> {
    // id 있으면 version. uuid도 있어야.
    // 다 있거나 다 없거나
    const destiny = [id, version, uuid];
    if (!destiny.every((v) => v) && destiny.some((v) => v))
      return Either.left("Zettel.create: id, version, uuid error");

    // Version of new zettel is 1
    if (!version) version = 1;

    const tagEntities = tags.map((t) => new Tag(t));

    const revisionOrFailure = Revision.create({
      version,
      uuid,
      createdAt,
      content,
      type: contentType,
    });
    if (revisionOrFailure.isLeft) return Either.left("Revision Create Error");
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
  createdAt: Date;
  //updatedAt?: Date;
  revision: {
    content: string;
    type: ContentType;
  };
  tags: string[];
};
