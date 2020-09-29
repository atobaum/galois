import Entity from "../../shared/Entity";

export type ContentType = "md" | "plain";
export default class Revision extends Entity<string> {
  // zettelId
  version: number | null;
  type: ContentType;
  content: string;
  createdAt: Date;

  private constructor(args: {
    uuid?: string;
    version?: number;
    type: ContentType;
    content: string;
    createdAt: Date;
  }) {
    super(args.uuid || null);
    this.version = args.version || null;
    this.type = args.type;
    this.content = args.content;
    this.createdAt = args.createdAt;
  }

  public static create() {}
}
