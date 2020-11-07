import { ZettelDTO } from "../../../graphql/zettelSchema";
import Either from "../../../lib/Either";
import AggregateRoot from "../../shared/AggregateRoot";
import Tag from "./Tag";

export enum ContentType {
  MARKDOWN = "md",
  PLAIN = "plain",
  BOOKMARK = "bookmark",
}

export type ZettelChange =
  | ["ADD_TAG", Tag]
  | ["REMOVE_TAG", Tag]
  | ["UPDATE_TITLE", string | null]
  | ["UPDATE_CONTENT", { content: string; contentType: ContentType }]
  | ["UPDATE_META"];

export default class Zettel extends AggregateRoot<ZettelChange, string> {
  private number?: number;
  private title: string | null;
  private content: string;
  private contentType: ContentType;
  private meta?: any;
  private tags: Tag[];
  private userId: number;
  private createdAt: Date;
  private updatedAt: Date;

  private constructor(args: {
    id?: string;
    number?: number;
    title: string | null;
    content: string;
    contentType: ContentType;
    userId: number;
    tags: Tag[];
    createdAt: Date;
    updatedAt: Date;
    meta?: any;
  }) {
    super(args.id);
    this.number = args.number;
    this.title = args.title;
    this.content = args.content;
    this.contentType = args.contentType;
    this.userId = args.userId;
    this.tags = args.tags;
    this.createdAt = args.createdAt;
    this.updatedAt = args.updatedAt;
    this.meta = args.meta;
  }

  // call after saved
  public completeUpdate(updatedAt: Date) {
    this.updatedAt = updatedAt;
    this.clearChanges();
  }

  public getUserId(): number {
    return this.userId;
  }

  public updateTitle(newTitle: string | null): Either<any, Zettel> {
    if (!this.changes.find((change) => change[0] === "UPDATE_TITLE"))
      this.addChange(["UPDATE_TITLE", this.title]);

    if (!newTitle) this.title = null;
    else this.title = newTitle;

    return Either.right(this);
  }

  public addTag(tagName: string): Either<any, Zettel> {
    const newTag = new Tag(tagName);
    if (this.changes.some((t) => t[0] === "REMOVE_TAG" && t[1].equals(newTag)))
      return Either.left("Cannot add removed tag: " + tagName);

    const oldTag = this.tags.find((t) => t.equals(newTag));
    if (oldTag) return Either.left("Cannot add existing tag: " + tagName);

    this.tags.push(newTag);

    this.addChange(["ADD_TAG", newTag]);
    return Either.right(this);
  }

  public removeTag(tagName: string): Either<any, Zettel> {
    const newTag = new Tag(tagName);
    if (this.changes.some((t) => t[0] === "ADD_TAG" && t[1].equals(newTag)))
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
    if (!this.changes.find((change) => change[0] === "UPDATE_CONTENT"))
      this.addChange([
        "UPDATE_CONTENT",
        { content: this.content, contentType: this.contentType },
      ]);

    this.content = content;
    if (contentType) this.contentType = contentType;

    return Either.right(this);
  }

  public setMeta(
    key: string,
    value: number | string | boolean | JSON | undefined | null
  ) {
    if (value === undefined || value === null) {
      if (this.meta) {
        delete this.meta[key];
        this.addChange(["UPDATE_META"]);
      }
    } else {
      if (!this.meta) this.meta = {};
      this.meta[key] = value;
      this.addChange(["UPDATE_META"]);
    }
  }

  public getMeta(key: string): number | string | boolean | JSON | undefined {
    if (!this.meta) return undefined;

    if (key in this.meta) return this.meta[key];
    return undefined;
  }

  public toDTO(): ZettelDTO {
    return {
      id: this._id,
      number: this.number,
      title: this.title,
      content: this.content,
      contentType: this.contentType,
      tags: this.tags.map((t) => t.name),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      meta: this.meta || {},
    };
  }

  public static create({
    id,
    number,
    title,
    content,
    contentType,
    tags,
    userId,
    meta,
    createdAt,
    updatedAt,
  }: CreateZettelDTO): Either<any, Zettel> {
    // id 있으면 version. uuid도 있어야.
    if ((id && !number) || (!id && number))
      return Either.left("id and number must exist or be undefined");
    // 다 있거나 다 없거나
    const destiny = [id, updatedAt];
    if (!destiny.every((v) => v) && destiny.some((v) => v))
      return Either.left("Zettel.create: id, updatedAt error");

    if (!updatedAt) updatedAt = createdAt;
    if (createdAt.getTime() > updatedAt.getTime() + 1000)
      return Either.left("createdAt must be before updatedAt");

    const tagEntities = tags.map((t) => new Tag(t));

    const zettel = new Zettel({
      id: id,
      number,
      title,
      userId,
      content,
      contentType,
      tags: tagEntities,
      meta,
      createdAt,
      updatedAt,
    });
    return Either.right(zettel);
  }
}

type CreateZettelDTO = {
  id?: string;
  number?: number;
  title: string | null;
  userId: number;
  createdAt: Date;
  updatedAt?: Date;
  content: string;
  contentType: ContentType;
  tags: string[];
  meta: any;
};
