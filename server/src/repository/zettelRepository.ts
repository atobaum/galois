import zettelModel, { Zettel } from "../models/zettelModel";

export default class ZettelRepository {
  static async save(zettel: Zettel): Promise<boolean> {
    return true;
  }

  static async create(
    zettelDTO: Pick<Zettel, "title" | "content" | "tags">
  ): Promise<Zettel> {
    const lastZettels = await zettelModel.find({}, ["id"], {
      limit: 1,
      sort: {
        id: -1,
      },
    });
    const lastId = lastZettels.length ? lastZettels[0].id : 0;
    const zettel = new zettelModel({
      id: lastId + 1,
      title: zettelDTO.title,
      revisions: [
        {
          version: 1,
          content: zettelDTO.content,
        },
      ],
      tags: zettelDTO.tags,
      // user:any
      // prevZettel: zettelDTO.prevZettel,
      // nextZettel: zettelDTO.nextZettel,
    });
    return (await zettel.save()).dto();
  }

  static async findAll(): Promise<Zettel[]> {
    const result = await zettelModel.find();
    return result.map((i) => i.dto());
  }

  static async findById(id: number): Promise<Zettel | null> {
    const result = await zettelModel.findOne({ id });
    console.log(result);
    if (!result) return result;
    else return result.dto();
  }

  static async findByUUID(uuid: string): Promise<Zettel | null> {
    const result = await zettelModel.findOne({ "revisions._id": uuid });
    if (!result) return result;
    result.revisions = result.revisions.filter((i) => {
      return i["_id"] == uuid;
    });
    return result.dto();
  }
}
