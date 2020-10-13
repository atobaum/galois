import { Collection } from "../../graphql/zettelSchema";
import Either from "../../lib/Either";
import IRepository from "../shared/IRepository";
import Zettel from "./entity/Zettle";

type FindOption = {
  userId: number;
  limit: number;
  cursor?: number;
};

export default interface IZettelRepository extends IRepository<Zettel, string> {
  findByUUID(uuid: string): Promise<Either<any, Zettel>>;
  findByNumber(number: number, userId: number): Promise<Either<any, Zettel>>;
  findAll(args: FindOption): Promise<Either<any, Collection<Zettel>>>;
  findByTag(tag: string): Promise<Either<any, Collection<Zettel>>>;
}
