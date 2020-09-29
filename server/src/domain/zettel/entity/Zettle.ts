import Revision from "./Revision";

export default class Zettel {
  id?: number;
  version?: number;
  uuid?: string;
  title?: string;
  content?: string;
  userId?: number;
  createdAt?: Date;
  revisions?: Revision[];
}
