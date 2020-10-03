import { Collection } from "../../graphql/zettelSchema";
import Either from "../../lib/Either";
import IRepository from "../shared/IRepository";
import { ContentType } from "./entity/Revision";
import Zettel from "./entity/Zettle";

type FindOption = {
  userId: number;
  limit: number;
  cursor?: number;
};

type CreateZettelDTO = {
  title: string | null;
  content: string;
  contentType: ContentType;
  tags: string[];
  userId: number;
};

export default interface IZettelRepository extends IRepository<Zettel> {
  findByUUID(uuid: string): Promise<Either<any, Zettel>>;
  findAll(args: FindOption): Promise<Either<any, Collection<Zettel>>>;
  findByTag(tag: string): Promise<Either<any, Collection<Zettel>>>;
}
