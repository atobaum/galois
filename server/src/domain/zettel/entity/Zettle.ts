import { ZettelDTO } from "../../../graphql/zettelSchema";
import Entity from "../../shared/Entity";
import Revision from "./Revision";

export default class Zettel extends Entity {
  version?: number;
  uuid?: string;
  title: string | null;
  userId: number;
  createdAt: Date;
  revision: Revision;
  tags: string[];

  constructor(args: {
    title: string | null;
    userId: number;
    createdAt: Date;
    revision: Revision;
    tags: string[];
    id: number | null;
  }) {
    super(args.id);
    this.title = args.title;
    this.userId = args.userId;
    this.createdAt = args.createdAt;
    this.revision = args.revision;
    this.tags = args.tags;
  }

  public toDTO(): ZettelDTO {
    throw new Error();
  }
}
