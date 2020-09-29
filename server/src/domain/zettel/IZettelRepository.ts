import IRepository from "../shared/IRepository";
import Zettel from "./entity/Zettle";

type FindOption = {
  userId: number;
  id?: number;
  version?: number;
  uuid?: string;
};

type CreateZettelDTO = {
  title?: string;
  content: string;
  tags: string[];
  userId: number;
};

type EditZettelDTO = {
  id: number;
  title?: string;
  content?: string;
  tags?: string[];
  userId: number;
};

export default interface IZettelRepository extends IRepository<Zettel> {
  findAll(args: FindOption): Promise<Zettel[]>;
  findByTag(tag: string): Promise<Zettel[]>;
}
