import Either from "../../../lib/Either";
import { isUUID } from "../../../lib/utils";
import Entity from "../../shared/Entity";
import { ContentType } from "./Zettle";

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
    type: ContentType;
  }): Either<any, Revision> {
    args.type;
    return Either.right(new Revision(args));
  }

  public setUUID(uuid: string): Either<any, Revision> {
    if (this._id || !isUUID(uuid)) return Either.left();
    this._id = uuid;
    return Either.right(this);
  }
}
