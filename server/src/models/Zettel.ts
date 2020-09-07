import { Schema, Types, model, Document } from "mongoose";

const revisionSchema = new Schema(
  {
    version: { type: Number, required: true },
    content: { type: String, required: true },
    deletedAt: Date,
  },
  { timestamps: true }
);
revisionSchema.virtual("uuid").get(function (this: any) {
  return this._id;
});

const zettelSchema = new Schema(
  {
    id: { type: Number, required: true },
    title: String,
    revisions: [revisionSchema],
    tags: [String],
    // user:any
    prevZettel: { type: Types.ObjectId, ref: "Zettel" },
    nextZettel: { type: Types.ObjectId, ref: "Zettel" },
    deletedAd: Date,
  },
  { id: false, timestamps: true }
);
zettelSchema.methods.dto = function (this: any): Zettel {
  const recentRevision = this.revisions[this.revisions.length - 1];
  return {
    content: recentRevision.content,
    version: recentRevision.version,
    uuid: recentRevision._id,
    id: this.id,
    tags: this.tags,
    user: this.user,
    createdAt: this.createdAt,
    nextZettel: this.nextZettel,
    prevZettel: this.prevZettel,
    title: this.title,
  };
};

const zettelModel = model<IZettelModel>("Zettel", zettelSchema);

export interface IZettelModel extends Document {
  id: number;
  title?: string;
  revisions: any[];
  tags: string[];
  user: any;
  createdAt?: Date;
  prevZettel?: Zettel;
  nextZettel?: Zettel;

  dto(): Zettel;
}

export class Zettel {
  uuid: string;
  id: number;
  version: number;
  title?: string;
  content: string;
  tags: string[];
  user: any;
  createdAt?: Date;
  prevZettel?: Zettel;
  nextZettel?: Zettel;

  constructor({ uuid, id, version, title, content, tags, user }: any) {
    this.uuid = uuid;
    this.id = id;
    this.version = version;
    this.title = title;
    this.content = content;
    this.tags = tags;
    this.user = user;
  }
}

export class ZettelRepository {
  static async save(zettel: Zettel): Promise<boolean> {
    return true;
  }
  static async create(
    zettelDTO: Omit<Zettel, "uuid" | "id" | "version">
  ): Promise<Zettel> {
    const zettel = new zettelModel({
      id: 1,
      title: zettelDTO.title,
      revisions: [
        {
          version: 1,
          content: zettelDTO.content,
        },
      ],
      tags: zettelDTO.tags,
      // user:any
      prevZettel: zettelDTO.prevZettel,
      nextZettel: zettelDTO.nextZettel,
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
