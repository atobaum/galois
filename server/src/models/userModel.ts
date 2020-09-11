import { Schema, model, Document } from "mongoose";

const socialSchema = new Schema(
  {
    id: { type: String, required: true },
    provider: { type: String, required: true },
  },
  { id: false, timestamps: true }
);

const userSchema = new Schema(
  {
    id: { type: Number, default: true },
    social: [socialSchema],
    username: String,
    picture: String,
    email: String,
  },
  { id: false, timestamps: true }
);

export interface IUserModel extends Document {
  id: number;
  username: string;
  social: { id: string; provider: string }[];
  picture?: string;
  email: string;
}

export default model<IUserModel>("User", userSchema);

export class User {
  id: number;
  username: string;
  picture?: string;
  email: string;

  constructor({ id, picture, username, email }: any) {
    this.id = id;
    this.username = username;
    this.picture = picture;
    this.email = email;
  }
}
