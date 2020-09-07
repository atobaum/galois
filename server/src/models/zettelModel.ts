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
export interface IRevisionModel extends Document {
  version: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

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
zettelSchema.index("id");
zettelSchema.index("tags");
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
export interface IZettelModel extends Document {
  id: number;
  title?: string;
  revisions: IRevisionModel[];
  tags: string[];
  // user: any;
  createdAt?: Date;
  updatedAt: Date;
  deletedAt: Date;
  prevZettel?: Zettel;
  nextZettel?: Zettel;

  dto(): Zettel;
}

export default model<IZettelModel>("Zettel", zettelSchema);

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
