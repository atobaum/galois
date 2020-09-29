import { ContentType } from "../domain/zettel/entity/Revision";
import Zettel from "../domain/zettel/entity/Zettle";
import { Collection } from "../graphql/zettelSchema";

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

  findZettels(
    option: FindZettelOption,
    userId: number
  ): Promise<Collection<Zettel>> {
    throw new Error("NOT_IMPLEMENTED");
  }

  getRevisions(id: number, userId: number): Promise<Zettel> {
    throw new Error("NOT_IMPLEMENTED");
  }

  createZettel(args: CreateZettelRequestDTO, userId: number): Promise<Zettel> {
    throw new Error("NOT_IMPLEMENTED");
  }

  createRevision(
    args: { id: number; content: string; contentType: ContentType },
    revision: any
  ): Promise<Zettel> {
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
