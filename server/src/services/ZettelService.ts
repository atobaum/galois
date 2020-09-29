import Zettel from "../domain/zettel/entity/Zettle";

export default class ZettelService {
  getZettelById(id: number, userId: number, version?: number): Zettel {
    throw new Error("a");
  }

  getZettelByUUID(uuid: string, userId: number): Zettel {
    throw new Error("a");
  }

  getZettelByTag(tag: string): Zettel[] {
    throw new Error("a");
  }

  getRevisions(id: number): any[] {
    throw new Error("a");
  }

  createZettel(zettelDTO: any): any {}

  createRevision(id: number, revision: any): any {}

  updateTitle(id: number, newTitle: any): any {}

  updateTags(id: number, newTags: string[]): any {}

  removeZettel(id: number, userId: number): any {}

  removeRevision(uuid: string, userId: number): any {}
}
