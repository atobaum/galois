import Either from "../../lib/Either";
import IRepository from "../shared/IRepository";
import User from "./entity/User";

export default interface IUserRepository extends IRepository<User> {
  findBySocialAccount(
    provider: string,
    socialId: string
  ): Promise<Either<any, User>>;
}
