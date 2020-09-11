import zettelModel, { Zettel } from "../models/zettelModel";

type FindOption = {
  userId?: number;
};

export default class ZettelRepository {
  static async save(zettel: Zettel): Promise<boolean> {
    return true;
  }

  static async create(
    zettelDTO: Pick<Zettel, "title" | "content" | "tags"> & {
      user: { id: number };
    }
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
      user: zettelDTO.user,
      tags: zettelDTO.tags,
      // prevZettel: zettelDTO.prevZettel,
      // nextZettel: zettelDTO.nextZettel,
    });
    return (await zettel.save()).dto();
  }


  static async findAll({ userId }: FindOption): Promise<Zettel[]> {
    if (!userId) return [];
    const result = await zettelModel.find({ user: { id: userId } });
    return result.map((i) => i.dto());
  }

  static async findById(args: {
    id: number;
    userId: number;
  }): Promise<Zettel | null> {
    const { id, userId } = args;
    const result = await zettelModel.findOne({ id, user: { id: userId } });
    console.log(result);
    if (!result) return result;
    else return result.dto();
  }

  static async findByUUID(args: {
    uuid: string;
    userId: number;
  }): Promise<Zettel | null> {
    const { uuid, userId } = args;
    const result = await zettelModel.findOne({
      "revisions._id": uuid,
      user: { id: userId },
    });
    if (!result) return result;
    result.revisions = result.revisions.filter((i) => {
      return i["_id"] == uuid;
    });
    return result.dto();
  }
}
