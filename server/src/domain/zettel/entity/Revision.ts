import Either from "../../../lib/Either";
import Entity from "../../shared/Entity";

export type ContentType = "md" | "plain";
type RevisionDTO = {
  uuid?: string;
  version: number;
  type: ContentType;
  content: string;
  createdAt: Date;
};

// Is this a value object
export default class Revision extends Entity<string> {
  // zettelId
  private version: number;
  private type: ContentType;
  private content: string;
  private createdAt: Date;

  constructor(args: {
    uuid?: string;
    version: number;
    type: ContentType;
    content: string;
    createdAt: Date;
  }) {
    super(args.uuid);

    this.version = args.version;
    this.type = args.type;
    this.content = args.content;
    this.createdAt = args.createdAt;
  }

  public toDTO(): RevisionDTO {
    return {
      uuid: this._id,
      version: this.version,
      type: this.type,
      content: this.content,
      createdAt: this.createdAt,
    };
  }

  public static create(args: {
    version: number;
    uuid?: string;
    createdAt: Date;
    content: string;
    contentType: ContentType;
  }): Either<any, Revision> {
    throw new Error();
  }
}
